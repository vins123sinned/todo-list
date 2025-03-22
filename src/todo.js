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

    updateTodo(title, description, date, time, priority, section) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.section = section;
        this.checked = false;
    }
}

export function pushNewTodo(title, description, dueDate, dueTime, priority, section) {
    const todo = new Todo(title, description, dueDate, dueTime, priority, section);
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}