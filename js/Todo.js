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
    }
    else {
        return new Todo(data);
    }
}

// Immutable API
Todo.prototype.complete = function () {
    return this.completed ? this : new Todo({text: this.text, completed: true});
};
Todo.prototype.uncomplete = function () {
    return !this.completed ? this : new Todo({text: this.text, completed: false});
};

Todo.PropType = Types.shape({
    text: Types.string.isRequired,
    completed: Types.bool.isRequired,
});


module.exports = Todo;
