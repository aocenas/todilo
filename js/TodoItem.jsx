const cx = require('classnames');
const React = require('react');
const {DragSource, DropTarget} = require('react-dnd');

const Todo = require('./Todo');

const Types = React.PropTypes;

let TodoItem = React.createClass({
    displayName: 'TodoItem',
    propTypes: {
        // props injected by DragSource
        connectDragSource: Types.func.isRequired,
        connectDragPreview: Types.func.isRequired,
        isDragging: Types.bool.isRequired,

        // props injected by DropTarget
        connectDropTarget: Types.func.isRequired,

        todo: Todo.PropType.isRequired,
        onTodoChange: Types.func.isRequired,
        onTodoMove: Types.func.isRequired,
        index: Types.number.isRequired,
        className: Types.string
    },

    render () {
        let {
            todo,
            index,
            connectDragSource,
            connectDragPreview,
            connectDropTarget,
            isDragging
        } = this.props;

        return connectDragPreview(connectDropTarget(
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
                {connectDragSource(
                    <i className='fa fa-bars'></i>
                )}
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
        connectDragPreview: connect.dragPreview(),
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

// makes TodoItem both dropTarget and dragSource so that when user drops
// one todo on another they reorder
module.exports = dropTarget(dragSource(TodoItem));
