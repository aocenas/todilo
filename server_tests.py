from flask import json
import server
import unittest

class TodiloTestCase(unittest.TestCase):

    def setUp(self):
        server.app.config['TESTING'] = True
        self.app = server.app.test_client()

    def test_add_todo(self):
        todo = {'text': 'test_add_todo', 'completed': False}
        self.app.post(
            '/api/todos', data=json.dumps(todo), content_type='application/json')

        todo = {'text': 'test_add_todo2', 'completed': False}
        self.app.post(
            '/api/todos', data=json.dumps(todo), content_type='application/json')

        todos = json.loads(self.app.get('/api/todos').data)['todos']
        todo1 = todos[-2:][0]
        todo2 = todos[-2:][1]
        assert \
            todo1['text'] == 'test_add_todo' and \
            not todo1['completed']

        assert \
            todo2['text'] == 'test_add_todo2' and \
            not todo2['completed']


    def test_change_todo(self):
        change = {'completed': True}
        todos = json.loads(self.app.get('/api/todos').data)['todos']
        lastIndex = len(todos) - 1
        lastTodo = todos[lastIndex]
        assert not lastTodo['completed']

        self.app.put(
            '/api/todos/{}'.format(lastTodo['id']),
            data=json.dumps(change),
            content_type='application/json'
        )

        todos = json.loads(self.app.get('/api/todos').data)['todos']
        lastTodo = todos[lastIndex]

        assert lastTodo['completed']


    def test_mark_all(self):
        todos = json.loads(self.app.get('/api/todos').data)['todos']
        # there should be some todos which are not completed yet
        # otherwise we need some better test data
        assert any([not todo['completed'] for todo in todos])

        self.app.put('/api/todos/mark')

        todos = json.loads(self.app.get('/api/todos').data)['todos']
        assert all([todo['completed'] for todo in todos])


    def test_move(self):
        todos = json.loads(self.app.get('/api/todos').data)['todos']
        from_index = len(todos) - 1
        todo_to_move = todos[from_index]
        self.app.put(
            '/api/todos/{}/move'.format(todo_to_move['id']),
            data=json.dumps({'newIndex': 0}),
            content_type='application/json'
        )

        todos = json.loads(self.app.get('/api/todos').data)['todos']
        assert todos[0]['text'] == todo_to_move['text']


if __name__ == '__main__':
    unittest.main()
