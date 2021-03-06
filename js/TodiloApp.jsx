const _ = require('lodash');
const React = require('react');
const Todo = require('./Todo');
const TodoList = require('./TodoList.jsx');
const API = require('./API');


module.exports = React.createClass({
    displayName: 'TodiloApp',


    getInitialState () {
        return {
            todos: []
        };
    },


    componentDidMount () {
        API.getAllTodos()
            .then(todos => this.setState({todos: todos.map(Todo)}));
    },


    render () {
        let uncompletedCount =
            this.state.todos.filter(todo => !todo.completed).length;
        return (
            <div className='todilo-app'>
                <h1>Todos</h1>
                <form>
                    <input
                        placeholder='What needs to be done'
                        value={this.state.newTodoText}
                        onChange={event => this.setState({
                            newTodoText: event.target.value
                        })}
                        type='text'
                    />
                    <button
                        type='submit'
                        onClick={this.addTodo}
                    >
                        Add Todo
                    </button>
                </form>
                {this.state.todos.length ?
                    <TodoList
                        todos={this.state.todos}
                        onTodoChange={this.onTodoChange}
                        onTodoMove={this.onTodoMove}
                    /> :

                    <div className='empty-state'>
                        You sure there is nothing you have to do? Add some todos.
                    </div>
                }
                <footer>
                    <div className='items-left'>
                        {this.state.todos.length ?
                            (uncompletedCount ?
                                uncompletedCount + ' items left' :
                                'all completed, yay!'
                            ) : 'no todos just yet'
                        }
                    </div>
                    {uncompletedCount ?
                        <button onClick={this.markAllCompleted}>
                            Mark all as completed
                        </button> : null
                    }
                </footer>
            </div>
        );
    },


    /**
     * Goes as param to TodoList, only change is completed <-> uncompleted
     * toggle.
     *
     * @arg {Todo} todo
     */
    onTodoChange (todo) {
        let index = this.state.todos.indexOf(todo);
        let newTodo = todo.completed ? todo.uncomplete() : todo.complete();
        let newTodos = _.clone(this.state.todos);
        newTodos[index] = newTodo;
        this.setState({todos: newTodos});
        API.updateTodo(newTodo);
    },


    markAllCompleted () {
        let newTodos = this.state.todos.map(todo => todo.complete());
        this.setState({todos: newTodos});
        API.markAllCompleted();
    },


    addTodo (event) {
        // using form and button type submit, se we need to prevent default
        // submit behavior
        event.preventDefault();
        if (this.state.newTodoText) {
            let newTodos = _.clone(this.state.todos);
            let newTodo = Todo({
                text: this.state.newTodoText,
                id: newTodos.length
            });
            newTodos.push(newTodo);
            // optimistic update
            this.setState({
                todos: newTodos,
                newTodoText: null
            });
            API.addTodo(newTodo).catch(() => {
                // TODO: rollback
            });
        }
    },


    onTodoMove (todo, moveToTodo) {
        let {todos} = this.state;
        let index = todos.indexOf(todo);
        let moveToIndex = todos.indexOf(moveToTodo);

        // shallow copy, without the todo we are moving
        let newTodos = todos.slice(0, index).concat(todos.slice(index + 1));
        // insert todo in correct place
        newTodos.splice(moveToIndex, 0, todo);
        this.setState({todos: newTodos});
        API.moveTodo(todo, moveToIndex);
    }
});
