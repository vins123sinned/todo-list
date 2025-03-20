export class Todo {
    constructor(title, description, dueDate, dueTime, priority, checked, section) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.checked = checked;
        this.section = section;
    }

    updateTodo(title, description, dueDate, dueTime, priority, checked, section) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.checked = checked;
        this.section = section;
    }
}

export function addSectionForm(sectionName) {
    console.log('hey!');
}