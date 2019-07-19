window.onload = function() {

    var e = React.createElement;
    var assign = function() {
        var result = {};
        for (var i=0; i<arguments.length; i++) {
            for (key in arguments[i]) {
                result[key] = arguments[i][key];
            };
        };
        return result;
    }

    var TodoApp = createReactClass({

        getInitialState: function() {
            return ({
                todos: [],
                editing: '',
                currentId: 0,
            })
        },

        addTodo: function() {
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
        },

        handleKeyDown: function(e) {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        },

        toggleTodo: function(e) {
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
        },

        handleInput: function(e) {
            this.setState({editing: e.target.value});
        },

        render: function() {
            var toggleTodo = this.toggleTodo;
            return e('div', null,
                e('h2', null, 'To Do'),
                e('input', {value:this.state.editing, onChange: this.handleInput, onKeyDown: this.handleKeyDown}),
                e('a', {href: '#' ,onClick: this.addTodo}, '+ Add'),
                e('ul', null,
                    this.state.todos.map(function(todo){
                        return e(TodoItem, {
                            key: todo.id,
                            todoId: todo.id,
                            text: todo.text,
                            isCompleted: todo.isCompleted,
                            handleClick: toggleTodo,
                        });
                    })
                )
            );
        }
    });

    var TodoItem = createReactClass({
        render: function() {
            var todoProps = {todoid: this.props.todoId, href: '#', onClick: this.props.handleClick};
            var text = this.props.isCompleted ? e('strike', null, this.props.text) : this.props.text;
            //var elType = this.props.isCompleted ? 'strike' : 'span';
            return e('li', todoProps, text);
        }
    });

    ReactDOM.render(
        e(TodoApp, null),
        document.getElementById('app')
    );

};
