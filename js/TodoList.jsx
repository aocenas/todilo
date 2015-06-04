const React = require('react');
const Todo = require('./Todo');

const Types = React.PropTypes;

module.exports = React.createClass({
    displayName: 'TodiloApp',
    propTypes: {
        todos: Types.arrayOf(Todo.PropType).isRequired
    },

    render () {
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                    <li key={index}>{todo.text}</li>
                )}
            </ul>
        );
    }
});
