jest.dontMock('../js/TodoItem.jsx');
jest.dontMock('../js/Todo');

//
// Not working at the moment, some problem with the react-dnd decorators.
// Probably need to create root component with DragDropContext(HTML5Backend),
// in the same way as TodoList or directly test it wrapped in TodoList
//
describe('TodoItem', function() {
    it('changes the text after click', function() {
        var React = require('react/addons');
        var TodoItem = require('../js/TodoItem.jsx').DecoratedComponent;
        var Todo = require('../js/Todo');
        var TestUtils = React.addons.TestUtils;

        var todo = Todo({text: 'test todo', id: 0});
        var identity = function (el) { return el; };

        // Render a checkbox with label in the document
        var todoItem = TestUtils.renderIntoDocument(
            <TodoItem
                todo={todo}
                onTodoChange={function () {}}
                onTodoMove={function () {}}
                index={0}
                isDragging={false}
                connectDragSource={identity}
                connectDragPreview={identity}
                connectDropTarget={identity}
            />
        );

        var input = TestUtils
            .findRenderedDOMComponentWithTag(todoItem, 'input');
        expect(input.getDOMNode().checked).toEqual(false);
    });
});
