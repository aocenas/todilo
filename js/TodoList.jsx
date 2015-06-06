const cx = require('classnames');
const React = require('react');

const Todo = require('./Todo');
const TodoItem = require('./TodoItem.jsx');

const Types = React.PropTypes;

module.exports = React.createClass({
    displayName: 'TodoList',
    propTypes: {
        todos: Types.arrayOf(Todo.PropType).isRequired,
        onTodoChange: Types.func.isRequired,
        onTodoMove: Types.func.isRequired
    },

    render () {

        let list = this.props.todos.map((todo, index) => {
            return (
                <TodoItem
                    key={index}
                    className={cx({
                        odd: (index + 1) % 2
                    })}
                    todo={todo}
                    index={index}
                    onTodoMove={this.props.onTodoMove}
                    onTodoChange={this.props.onTodoChange}
                />
            );
        });

        return (
            <ul>
                {list}
            </ul>
        );
    }

});
