const React = require('react');
const Types = React.PropTypes;

module.exports = React.createClass({
    displayName: 'TodiloApp',
    propTypes: {
        todos: Types.arrayOf(Types.string).isRequired
    },

    render () {
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                    <li key={index}>{todo}</li>
                )}
            </ul>
        );
    }
});
