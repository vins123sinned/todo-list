export class Todo {
    constructor(title, description, dueDate, dueTime, priority, section, checked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.section = section;
        this.checked = checked;
    }

    updateTodo(title, description, dueDate, dueTime, priority, section, checked) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.section = section;
        this.checked = checked;
    }
}

export function addSectionForm(sectionName) {
    console.log('hey!');
}