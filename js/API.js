const {API_URL} = require('./constants');
const Request = require('request-promise');

module.exports = {
    getAllTodos () {
        return Request(`${API_URL}/todos`)
            .json()
            .then(body => body.todos);
    },


    addTodo (todo) {
        return Request
            .post(`${API_URL}/todos`)
            .json(todo);
    },


    updateTodo (todo, index) {
        return Request
            .put(`${API_URL}/todos/${index}`)
            .json(todo);
    },


    markAllCompleted () {
        return Request.put(`${API_URL}/todos/mark`);
    }
};
