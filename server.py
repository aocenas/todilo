from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
app.debug = True

# TODO: maybe use Redis or something more real life like
todos = [
    {'text': 'Discuss report with John', 'completed': False, 'id': 0},
    {'text': 'Get a haircut', 'completed': True, 'id': 1},
    {'text': 'Pay electricity bill', 'completed': True, 'id': 2},
    {'text': 'Check gym hours', 'completed': False, 'id': 3},
]

@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/api/todos', methods=['GET'])
def all_todos():
    return jsonify(todos=todos)


@app.route('/api/todos', methods=['POST'])
def add_todo():
    request.json.update({'id': len(todos)})
    todos.append(request.json)
    return jsonify(**request.json), 201


@app.route('/api/todos/<int:index>', methods=['PUT'])
def update_todo(index):
    # TODO: index out of bounds maybe
    todo = todos[index]
    todo.update(request.json)
    return jsonify(**todo)


@app.route('/api/todos/mark', methods=['PUT'])
def mark_all_completed():
    for todo in todos: todo['completed'] = True
    return jsonify(todos=todos)


@app.route('/api/todos/<int:index>/move', methods=['PUT'])
def move_todo(index):
    todo = todos[index]
    del todos[index]
    todos.insert(request.json['newIndex'], todo)
    return ('', 204)


if __name__ == '__main__':
    app.run()
