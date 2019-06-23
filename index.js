window.onload = function() {

    var e = React.createElement;

    function TodoList() {
        return e('p', null, 'Hi');
    }

    ReactDOM.render(
        e(TodoList, null),
        document.getElementById('app')
    );

};
