const cx = require('classnames');
const React = require('react');

const Todo = require('./Todo');

const Types = React.PropTypes;

module.exports = React.createClass({
    displayName: 'TodiloList',
    propTypes: {
        todos: Types.arrayOf(Todo.PropType).isRequired,
        onTodoChange: Types.func.isRequired,
        onTodoMove: Types.func.isRequired
    },

    render () {

        let list = this.props.todos.map((todo, index) => {

            // creates onClick handler, only needs num of spaces to move
            let move =
                diff => () => this.props.onTodoMove(todo, index, index + diff);
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
        });

        return (
            <ul>
                {list}
            </ul>
        );
    }

});
