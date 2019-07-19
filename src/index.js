window.onload = function() {

    class TodoApp extends React.Component {
        state = {
            todos: [],
            editing: '',
            currentId: 0,
        };

        addTodo = () => {
            var newTodo = this.state.editing;
            var currentId = this.state.currentId;
            if (newTodo) {
                this.setState({
                    todos: this.state.todos.concat({
                        id: currentId,
                        text: newTodo,
                        isCompleted: false,
                    }),
                    editing: '',
                    currentId: currentId + 1
                });
            }
        };

        handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        };

        toggleTodo = (e) => {
            var todos = this.state.todos;
            var todoId = e.currentTarget.getAttribute('todoid');
            this.setState({
                todos: todos.map( function(todo, idx) {
                    if( idx === parseInt(todoId) ) {
                        return {
                            id: todo.id,
                            text: todo.text,
                            isCompleted: !todo.isCompleted,
                        };
                    }
                    return todo;
                })
            });
        };

        handleInput = (e) => {
            this.setState({editing: e.target.value});
        };

        render() {
            var toggleTodo = this.toggleTodo;
            var todoElems =  this.state.todos.map( (todo) => {
                return (
                    < TodoItem
                         key = {todo.id}
                         todoId = {todo.id}
                         text = {todo.text}
                         isCompleted = {todo.isCompleted}
                         handleClick = {toggleTodo}
                    />
                )
            });
            return (
                <div>
                    <h2>To Do</h2>
                    <input value={this.state.editing} onChange={this.handleInput} onKeyDown={this.handleKeyDown} />
                    <a href='#' onClick={this.addTodo}>+ Add</a>
                    <ul>
                        {todoElems}
                    </ul>
                </div>
            );
        }
    }

    var TodoItem = (props) => {
        var text = props.isCompleted ? <strike>{props.text}</strike> : props.text;
        return (
            <li todoid={props.todoId} onClick={props.handleClick} href="#">
                {text}
            </li>
        )
    };

    ReactDOM.render(
        <TodoApp />,
        document.getElementById('app')
    );

};
