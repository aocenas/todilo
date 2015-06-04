const cx = require('classnames');
const React = require('react');

const Todo = require('./Todo');

const Types = React.PropTypes;

module.exports = React.createClass({
    displayName: 'TodiloApp',
    propTypes: {
        todos: Types.arrayOf(Todo.PropType).isRequired
    },

    render () {
        let list = this.props.todos.map((todo, index) => {
            return (
                <li
                    key={index}
                    className={cx({
                        odd: (index + 1) % 2,
                        completed: todo.completed
                    })}
                >
                    <input
                        type='checkbox'
                        checked={todo.completed}
                    />
                    {todo.text}
                </li>
            );
        });

        return (
            <ul>
                {list}
            </ul>
        );
    }
});
