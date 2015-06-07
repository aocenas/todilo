jest.dontMock('../js/Todo');

describe('is immutable', function() {
    it('returns new Todo on complete()', function() {
        console.log('testing');
        var Todo = require('../js/Todo');
        var todo = Todo('test');
        expect(todo.completed).toEqual(false);

        var newTodo = todo.complete();
        expect(newTodo.completed).toEqual(true);
        expect(todo.completed).toEqual(false);

    });
});
