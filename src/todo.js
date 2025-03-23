export const todos = [];

export class Todo {
    constructor(title, description, date, time, priority, section) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.section = section;
        this.checked = false;
    }

    updateTodo() {
        
    }

    sayHi() {
        console.log('hi!');
    }
}

export function populateTodos() {
    const getLocalTodos = localStorage.getItem('todos');
    const localTodos = JSON.parse(getLocalTodos);

    if (!localTodos) return;

    localTodos.forEach((todo) => {
        todos.push(new Todo(todo.title, todo.description, todo.date, todo.time, todo.priority, todo.section))
    });
}

export function pushNewTodo(title, description, date, time, priority, section) {
    const todo = new Todo(title, description, date, time, priority, section);
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}