const React = require('react');

module.exports = React.createClass({
    displayName: 'TodiloApp',
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
            </div>
        );
    }
});
