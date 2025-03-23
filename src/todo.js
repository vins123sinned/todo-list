import { showSectionPage } from "./section";

export const todos = [];

const ids = [];

export class Todo {
    constructor(title, description, date, time, priority, section, checked, id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.section = section;
        this.checked = checked;
        this.id = id;
    }

    toggleChecked() {
        this.checked = !this.checked;
    }
}

export function updateTodo(todo) {
    todos[todo.id] = todo;
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function deleteTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}  

export function populateTodos() {
    const getLocalTodos = localStorage.getItem('todos');
    const localTodos = JSON.parse(getLocalTodos);

    if (!localTodos) return;

    localTodos.forEach((todo) => {
        todos.push(new Todo(todo.title, todo.description, todo.date, todo.time, todo.priority, todo.section, todo.checked, todo.id))
    });
}

export function pushNewTodo(title, description, date, time, priority, section) {
    const main = document.querySelector('.main');
    const sectionName = document.querySelector('.section-page-heading').textContent;

    const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const todo = new Todo(title, description, date, time, priority, section, false, id);

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    main.replaceChildren();
    showSectionPage(sectionName);
}