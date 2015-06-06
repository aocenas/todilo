const cx = require('classnames');
const React = require('react');

const Todo = require('./Todo');

const Types = React.PropTypes;

module.exports = React.createClass({
    displayName: 'TodoItem',
    propTypes: {
        todo: Todo.PropType.isRequired,
        onTodoChange: Types.func.isRequired,
        onTodoMove: Types.func.isRequired,
        index: Types.number.isRequired,
        className: Types.string
    },

    render () {
        let {todo, index} = this.props;
        // creates onClick handler, only needs num of spaces to move
        let move =
            diff => () => this.props.onTodoMove(todo, index, index + diff);
        return (
            <li
                className={cx(this.props.className, {
                    completed: todo.completed
                })}
            >
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => this.props.onTodoChange(todo, index)}
                />
                <div className='text'>{todo.text}</div>
                <button onClick={move(-1)}>
                    up
                </button>
                <button onClick={move(+1)}>
                    down
                </button>
            </li>
        );
    }

});
