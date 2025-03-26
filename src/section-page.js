import { addOverlay, addOverlayBackground, removeElement, formatDate, formatTime } from "./dom";
import { todos } from "./todo";
import { addTodoForm, editTodoForm } from "./add-todo";

export function sidebarOptionPage(filteredTodos, sectionName) {
    const main = document.querySelector('.main');
    const sectionHeading = document.createElement('h1');
    const todoUl = document.createElement('ul');

    main.replaceChildren();
    
    sectionHeading.textContent = sectionName;
    sectionHeading.classList.add('section-page-heading');
    todoUl.classList.add('todo-ul');

    if (!todos) {
        todoUl.appendChild(addTaskList());
        main.appendChild(sectionHeading);
        main.appendChild(todoUl);
        return;
    };
    
    filteredTodos.forEach((todo) => {
        const list = document.createElement('li');
        const checkbox = document.createElement('span');
        const informationContainer = document.createElement('div');
        const title = document.createElement('p');
        const description = document.createElement('p');
        const due = document.createElement('div');

        list.dataset.id = todo.id;
        title.textContent = todo.title;
        description.textContent = todo.description;

        checkbox.classList.add('todo-checkbox', `checkbox-${todo.priority}`);
        informationContainer.classList.add('todo-information');
        list.classList.add('todo-list');
        title.classList.add('todo-title');
        description.classList.add('todo-description');
        due.classList.add('todo-due');

        if (todo.checked) {
            list.classList.add('todo-completed');
            checkbox.toggleAttribute('data-checked');
            checkbox.classList.add('todo-checked');
        }

        list.appendChild(checkbox);
        informationContainer.appendChild(title);
        informationContainer.appendChild(description);

        if (todo.date) {
            const dueDate = document.createElement('p');
            dueDate.classList.add('todo-date');
            dueDate.textContent = formatDate(todo.date);

            due.appendChild(dueDate);
        } 
        if (todo.time) {
            const dueTime = document.createElement('p');
            dueTime.textContent = formatTime(todo.time);

            due.appendChild(dueTime);
        }
        if (due.hasChildNodes()) {
            const dueIcon = document.createElement('span');
            dueIcon.classList.add('material-symbols-outlined', 'due-icon');
            dueIcon.textContent = 'event';

            due.prepend(dueIcon);
            informationContainer.appendChild(due);
        }

        list.addEventListener('click', listClicked);

        checkbox.addEventListener('click', (event) => {
            event.stopPropagation();
            
            checkboxClicked(checkbox, list, todo.id);
        });

        list.appendChild(informationContainer);
        list.appendChild(hoverOptions(todo, todo.section));
        todoUl.appendChild(list);
    });

    main.appendChild(sectionHeading);
    main.appendChild(todoUl);

    //since no section, get first one or current section 
    createAddTask();
}

export function showSectionPage(section) {
    if (checkSectionName(section)) return;

    const main = document.querySelector('.main');
    const sectionHeading = document.createElement('h1');
    const todoUl = document.createElement('ul');
    
    sectionHeading.textContent = section;
    sectionHeading.classList.add('section-page-heading');
    todoUl.classList.add('todo-ul');

    if (!todos) {
        todoUl.appendChild(addTaskList());
        main.appendChild(sectionHeading);
        main.appendChild(todoUl);
        return;
    };
    
    const sectionTodos = todos.filter((todo) => {
        return todo.section === section;
    });
    
    sectionTodos.forEach((todo) => {
        const list = document.createElement('li');
        const checkbox = document.createElement('span');
        const informationContainer = document.createElement('div');
        const title = document.createElement('p');
        const description = document.createElement('p');
        const due = document.createElement('div');

        list.dataset.id = todo.id;
        title.textContent = todo.title;
        description.textContent = todo.description;

        checkbox.classList.add('todo-checkbox', `checkbox-${todo.priority}`);
        informationContainer.classList.add('todo-information');
        list.classList.add('todo-list');
        title.classList.add('todo-title');
        description.classList.add('todo-description');
        due.classList.add('todo-due');

        if (todo.checked) {
            list.classList.add('todo-completed');
            checkbox.toggleAttribute('data-checked');
            checkbox.classList.add('todo-checked');
        }

        list.appendChild(checkbox);
        informationContainer.appendChild(title);
        informationContainer.appendChild(description);

        if (todo.date) {
            const dueDate = document.createElement('p');
            dueDate.classList.add('todo-date');
            dueDate.textContent = formatDate(todo.date);

            due.appendChild(dueDate);
        } 
        if (todo.time) {
            const dueTime = document.createElement('p');
            dueTime.textContent = formatTime(todo.time);

            due.appendChild(dueTime);
        }
        if (due.hasChildNodes()) {
            const dueIcon = document.createElement('span');
            dueIcon.classList.add('material-symbols-outlined', 'due-icon');
            dueIcon.textContent = 'event';

            due.prepend(dueIcon);
            informationContainer.appendChild(due);
        }

        list.addEventListener('click', listClicked);

        checkbox.addEventListener('click', (event) => {
            event.stopPropagation();
            
            checkboxClicked(checkbox, list, todo.id);
        });

        list.appendChild(informationContainer);
        list.appendChild(hoverOptions(todo, section, list));
        todoUl.appendChild(list);
    });

    main.appendChild(sectionHeading);
    main.appendChild(todoUl);
    createAddTask(section);
}

function checkSectionName(section) {
    switch (section) {
        case 'Today':
            const todayOption = document.querySelector('.today-option');
            todayOption.click();
            return true;
        case 'Upcoming':
            const upcomingOption = document.querySelector('.upcoming-option');
            upcomingOption.click();
            return true;
        case 'This Year':
            const yearOption = document.querySelector('.year-option');
            yearOption.click();
            return true;
        case 'All Todos':
            const allOption = document.querySelector('.all-option');
            allOption.click();
            return true;
        default:
            return false;
    }
}

function listClicked() {
    const todo = todos.find((currentTodo) => currentTodo.id === this.dataset.id);
    
    expandTodo(todo);
    addOverlay('.expanded-todo');
    addOverlayBackground();
}

function expandTodo(todo) {
    const todoInformation = document.createElement('div');
    const expandedTodoHeader = document.createElement('div');
    const expandedTodoHeading = document.createElement('h1');
    const closeIcon = document.createElement('span');
    const propertiesContainer = document.createElement('div');

    expandedTodoHeading.textContent = 'Todo Information';
    closeIcon.textContent = 'close';

    todoInformation.classList.add('expanded-todo');
    expandedTodoHeader.classList.add('expanded-todo-header');
    expandedTodoHeading.classList.add('expanded-todo-heading');
    propertiesContainer.classList.add('properties-container');
    closeIcon.classList.add('material-symbols-outlined');

    for (const property in todo) {
        if (property === 'id') continue;

        if (todo[property]) {
            const propertyHeading = document.createElement('h2');
            const propertyInfo = document.createElement('p');

            switch (property) {
                case "title":
                    propertyHeading.textContent = 'Title';
                    propertyInfo.textContent = todo[property];
                    propertyInfo.classList.add('property-title');
                    break;
                case "description":
                    propertyHeading.textContent = 'Description';
                    propertyInfo.textContent = todo[property];
                    break;
                case "priority":
                    propertyHeading.textContent = 'Priority';
                    propertyInfo.textContent = todo[property];
                    propertyInfo.classList.add(`property-priority-${todo[property]}`);
                    break;
                case "date":
                    propertyHeading.textContent = 'Due Date';
                    propertyInfo.textContent = formatDate(todo[property]);
                    propertyInfo.classList.add('property-datetime');
                    const dateIcon = document.createElement('span');
                    dateIcon.classList.add('material-symbols-outlined', 'property-datetime-icon');
                    dateIcon.textContent = 'event';
                    propertyInfo.prepend(dateIcon);
                    break;
                case "time":
                    propertyHeading.textContent = 'Due Time';
                    propertyInfo.textContent = formatTime(todo[property]);
                    propertyInfo.classList.add('property-datetime');
                    const timeIcon = document.createElement('span');
                    timeIcon.classList.add('material-symbols-outlined', 'property-datetime-icon');
                    timeIcon.textContent = 'schedule';
                    propertyInfo.prepend(timeIcon);
                    break;
                case "section":
                    propertyHeading.textContent = 'Section';
                    propertyInfo.textContent = todo[property];
                    const sectionIcon = document.createElement('span');
                    sectionIcon.classList.add('material-symbols-outlined', 'property-section-icon');
                    sectionIcon.textContent = 'tag';
                    propertyInfo.prepend(sectionIcon);
                    break;
            }

            propertyHeading.classList.add('property-heading');
            propertyInfo.classList.add('property-info');

            propertiesContainer.appendChild(propertyHeading);
            propertiesContainer.appendChild(propertyInfo);
        }
    }

    closeIcon.addEventListener('click', () => {
        removeElement('.expanded-todo');
    });

    expandedTodoHeader.appendChild(expandedTodoHeading);
    expandedTodoHeader.appendChild(closeIcon);
    todoInformation.appendChild(expandedTodoHeader);
    todoInformation.appendChild(propertiesContainer);
    document.body.appendChild(todoInformation);
}

function checkboxClicked(checkbox, list, id) {
    checkbox.toggleAttribute('data-checked');

    if (checkbox.hasAttribute('data-checked')) {
        list.classList.add('todo-completed');
        checkbox.classList.add('todo-checked');
    } else {
        list.classList.remove('todo-completed');
        checkbox.classList.remove('todo-checked');
    }

    const todo = todos.find((todo) => todo.id === id);
    todo.toggleChecked();
}

function hoverOptions(todo, section) {
    const main = document.querySelector('.main');
    const hoverOptions = document.createElement('div');
    const editButton = document.createElement('button');
    const editIcon = document.createElement('span');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('span');

    editButton.type = 'button';
    editIcon.textContent = 'edit';
    deleteButton.type = 'button';
    deleteIcon.textContent = 'delete';

    hoverOptions.classList.add('hover-options');
    editButton.classList.add('hover-button');
    editIcon.classList.add('material-symbols-outlined');
    deleteButton.classList.add('hover-button');
    deleteIcon.classList.add('material-symbols-outlined');

    editButton.prepend(editIcon);
    hoverOptions.appendChild(editButton);
    deleteButton.prepend(deleteIcon);
    hoverOptions.appendChild(deleteButton);

    editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const list = document.querySelector(`[data-id=${todo.id}]`);

        editTodoForm(todo);
        list.removeEventListener('click', listClicked);
    });

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();

        todo.deleteTodo();
        main.replaceChildren();
        showSectionPage(section);
    });

    return hoverOptions;
}

function createAddTask(section) {
    const todoUl = document.querySelector('.todo-ul');
    const list = document.createElement('li');
    const listIcon = document.createElement('span');

    list.textContent = 'Add todo';
    listIcon.textContent = 'add';

    list.classList.add('add-todo-list');
    listIcon.classList.add('material-symbols-outlined', 'add-todo-icon');

    list.addEventListener('click', () => {
        addTodoForm(section);
    });

    list.prepend(listIcon);
    todoUl.appendChild(list);
}