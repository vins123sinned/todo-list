import { showSectionPage } from "./section-page.js";

export const todos = [];

export let currentSection;

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

    updateTodo(title, description, date, time, priority, section) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.section = section;

        this.saveChanges();
    }

    toggleChecked() {
        this.checked = !this.checked;

        this.saveChanges();
    }

    saveChanges() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    deleteTodo() {
        const index = todos.findIndex((todo) => todo.id === this.id);
        todos.splice(index, 1);

        localStorage.setItem('todos', JSON.stringify(todos));
    }
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

export function getCurrentSection() {
    const getLocalSection = localStorage.getItem('current');
    const localSection = JSON.parse(getLocalSection);

    if (!localSection) {
        const getSections = localStorage.getItem('sections');
        const sections = JSON.parse(getSections);

        if (sections[0]) {
            localStorage.setItem('current', JSON.stringify(sections[0]));
            currentSection = sections[0];
        } else {
            localStorage.setItem('sections', JSON.stringify(['default']));
            localStorage.setItem('current', JSON.stringify('default'));
            currentSection = 'default';
        }
    } else {
        currentSection = localSection;
    }

    return currentSection;
}

export function updateCurrentSection(section) {
    localStorage.setItem('current', JSON.stringify(section));
    currentSection = section;
}