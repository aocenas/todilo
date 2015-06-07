const React = require('react');
const Types = React.PropTypes;

/**
 * @arg {Object} data
 * @arg {string} data.text
 * @arg {boolean} [data.completed] - defaults to false
 */
function Todo(data) {
    if (this instanceof Todo) {
        this.text = data.text;
        this.completed = !!data.completed;
        this.id = data.id;
    }
    else {
        return new Todo(data);
    }
}

// Immutable API
Todo.prototype.complete = function () {
    return this.completed ? this : new Todo({text: this.text, completed: true, id: this.id});
};
Todo.prototype.uncomplete = function () {
    return !this.completed ? this : new Todo({text: this.text, completed: false, id: this.id});
};

Todo.PropType = Types.shape({
    text: Types.string.isRequired,
    completed: Types.bool.isRequired,
    id: Types.number.isRequired,
    complete: Types.func.isRequired,
    uncomplete: Types.func.isRequired
});


module.exports = Todo;
