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
        todos = json.loads(self.app.get('/api/todos').data)['todos']
        lastTodo = todos[-1:][0]
        assert \
            lastTodo['text'] == 'test_add_todo' and \
            not lastTodo['completed']

if __name__ == '__main__':
    unittest.main()
