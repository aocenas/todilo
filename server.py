from flask import Flask, render_template, jsonify, request
from functools import wraps

app = Flask(__name__)
app.debug = True

# TODO: use some real database
# uncomment for some initial data
#todos = [
#    {'text': 'Discuss report with John', 'completed': False, 'id': 0},
#    {'text': 'Get a haircut', 'completed': True, 'id': 1},
#    {'text': 'Pay electricity bill', 'completed': True, 'id': 2},
#    {'text': 'Check gym hours', 'completed': False, 'id': 3},
#]

todos = []

def todo_by_id(id):
    todo = [todo for todo in todos if todo['id'] == id]
    return todo[0] if len(todo) else None

def inject_todo_or_404(func):
    @wraps(func)
    def wrapper(id, *args, **kwargs):
        todo = todo_by_id(id)
        if todo:
            return func(todo, *args, **kwargs)
        else:
            return ('', 404)
    return wrapper


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


@app.route('/api/todos/<int:id>', methods=['PUT'])
@inject_todo_or_404
def update_todo(todo):
    todo.update(request.json)
    return jsonify(**todo)


@app.route('/api/todos/mark', methods=['PUT'])
def mark_all_completed():
    for todo in todos: todo['completed'] = True
    return jsonify(todos=todos)


@app.route('/api/todos/<int:id>/move', methods=['PUT'])
@inject_todo_or_404
def move_todo(todo):
    index = todos.index(todo)
    del todos[index]
    todos.insert(request.json['newIndex'], todo)
    return ('', 204)


if __name__ == '__main__':
    app.run()
