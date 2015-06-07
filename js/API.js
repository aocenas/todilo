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


    updateTodo (todo) {
        return Request
            .put(`${API_URL}/todos/${todo.id}`)
            .json(todo);
    },


    markAllCompleted () {
        return Request.put(`${API_URL}/todos/mark`);
    },

    moveTodo (todo, newIndex) {
        return Request
            .put(`${API_URL}/todos/${todo.id}/move`)
            .json({newIndex});
    }
};
