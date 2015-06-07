jest.dontMock('../js/TodoItem.jsx');
jest.dontMock('../js/Todo');

describe('TodoList', function() {
    it('renders correct text and input status from todo', function() {
        var React = require('react/addons');
        var TodoList = require('../js/TodoList.jsx');
        var Todo = require('../js/Todo');
        var TestUtils = React.addons.TestUtils;

        var todo = Todo({text: 'test todo', id: 0});
        var identity = function (el) { return el; };

        // Render a checkbox with label in the document
        var todoList = TestUtils.renderIntoDocument(
            <TodoList
                todos={[todo]}
                onTodoChange={function () {}}
                onTodoMove={function () {}}
            />
        );

        var input = TestUtils
            .findRenderedDOMComponentWithTag(todoList, 'input');
        expect(input.getDOMNode().checked).toEqual(false);

        var text = TestUtils
            .findRenderedDOMComponentWithClass(todoList, 'text');
        expect(text.getDOMNode().textContent).toEqual('test todo');
    });
});
