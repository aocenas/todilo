const cx = require('classnames');
const React = require('react');
const {DragSource, DropTarget} = require('react-dnd');

const Todo = require('./Todo');

const Types = React.PropTypes;

let TodoItem = React.createClass({
    displayName: 'TodoItem',
    propTypes: {
        connectDragSource: Types.func.isRequired,
        connectDropTarget: Types.func.isRequired,
        isDragging: Types.bool.isRequired,

        todo: Todo.PropType.isRequired,
        onTodoChange: Types.func.isRequired,
        onTodoMove: Types.func.isRequired,
        index: Types.number.isRequired,
        className: Types.string
    },

    render () {
        let {todo,
            index,
            connectDragSource,
            connectDropTarget,
            isDragging} = this.props;

        // creates onClick handler, only needs num of spaces to move
        let move =
            diff => () => this.props.onTodoMove(todo, index, index + diff);
        return connectDragSource(connectDropTarget(
            <li
                className={cx(this.props.className, {
                    completed: todo.completed,
                    'is-dragging': isDragging
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
        ));
    }
});

let cardSource = {
    beginDrag(props) {
        return {
            todo: props.todo
        };
    }
};

let cardTarget = {
    hover(props, monitor) {
        let {todo} = monitor.getItem();

        if (todo.id !== props.todo.id) {
            props.onTodoMove(todo, props.todo);
        }
    }
};

let dragSource = DragSource(
    'TodoItem',
    cardSource,
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
);

let dropTarget = DropTarget(
    'TodoItem',
    cardTarget,
    connect => ({
        connectDropTarget: connect.dropTarget(),
    })
);
module.exports = dropTarget(dragSource(TodoItem));
