const cx = require('classnames');
const React = require('react');
const { DragDropContext } = require('react-dnd');
const HTML5Backend = require('react-dnd/modules/backends/HTML5');

const Todo = require('./Todo');
const TodoItem = require('./TodoItem.jsx');

const Types = React.PropTypes;

let TodoList = React.createClass({
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
                    key={todo.id}
                    className={cx({
                        odd: (index + 1) % 2
                    })}
                    todo={todo}
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

let dropContext = DragDropContext(HTML5Backend);
module.exports = dropContext(TodoList);

