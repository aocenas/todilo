const React = require('react');
const Types = React.PropTypes;

function Todo(text, completed=false) {
    if (this instanceof Todo) {
        this.text = text;
        this.completed = completed;
    }
    else {
        return new Todo(text, completed);
    }
}

// Immutable API
Todo.prototype.complete = function () {
    return this.completed ? this : new Todo(this.text, true);
};
Todo.prototype.uncomplete = function () {
    return !this.completed ? this : new Todo(this.text, false);
};

Todo.PropType = Types.shape({
    text: Types.string.isRequired,
    completed: Types.bool.isRequired,
});


module.exports = Todo;
