from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
app.debug = True

# TODO: maybe use Redis or something more real life like
todos = [
    {'text': 'Discuss report with John', 'completed': False},
    {'text': 'Get a haircut', 'completed': True},
    {'text': 'Pay electricity bill', 'completed': True},
    {'text': 'Check gym hours', 'completed': False},
]

@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/api/todos', methods=['GET'])
def all_todos():
    return jsonify(todos=todos)


@app.route('/api/todos', methods=['POST'])
def add_todo():
    todos.append(request.json)
    return jsonify(**request.json), 201


@app.route('/api/todos/<int:index>', methods=['PUT'])
def update_todo(index):
    # TODO: index out of bounds maybe
    todo = todos[index]
    todo.update(request.json)
    return jsonify(**todo)


if __name__ == '__main__':
    app.run()
