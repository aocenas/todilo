const React = require('react');
const TodoList = require('./TodoList.jsx');

module.exports = React.createClass({
    displayName: 'TodiloApp',


    getInitialState () {
        return {
            todos: [
                'Discuss report with John',
                'Get a haircut',
                'Pay electricity bill',
                'Check gym hours',
            ]
        };
    },


    render () {
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
                    <TodoList todos={this.state.todos}/> :
                    <div>
                        You sure there is nothing you have to do?
                    </div>
                }
                <footer>
                    <div className='items-left'>items left</div>
                    <button>Mark all as complete</button>
                </footer>
            </div>
        );
    }
});
