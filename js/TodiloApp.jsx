const _ = require('lodash');
const React = require('react');
const Todo = require('./Todo');
const TodoList = require('./TodoList.jsx');


module.exports = React.createClass({
    displayName: 'TodiloApp',


    getInitialState () {
        return {
            todos: [
                new Todo('Discuss report with John'),
                new Todo('Get a haircut', true),
                new Todo('Pay electricity bill', true),
                new Todo('Check gym hours'),
            ]
        };
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
                        type='text'
                    />
                    <button type='submit'>
                        Add Todo
                    </button>
                </form>
                {this.state.todos.length ?
                    <TodoList
                        todos={this.state.todos}
                        onTodoChange={this.onTodoChange}
                    /> :

                    <div>
                        You sure there is nothing you have to do?
                    </div>
                }
                <footer>
                    <div className='items-left'>
                        {uncompletedCount ?
                            uncompletedCount + ' items left' :
                            'all completed, yay!'
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
     * @arg {number} index - index of the todo in the list
     */
    onTodoChange (todo, index) {
        let newTodo = todo.completed ? todo.uncomplete() : todo.complete();
        let newTodos = _.clone(this.state.todos);
        newTodos[index] = newTodo;
        this.setState({todos: newTodos});
    },


    markAllCompleted () {
        let newTodos = this.state.todos.map(todo => todo.complete());
        this.setState({todos: newTodos});
    }
});
