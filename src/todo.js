import { showSectionPage } from "./section";

export const todos = [];

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

    let id;
    if (!todos) {
        id = 0;
    } else {
        id = todos.length;
    }

    const todo = new Todo(title, description, date, time, priority, section, false, id);

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    main.replaceChildren();
    showSectionPage(sectionName);
}