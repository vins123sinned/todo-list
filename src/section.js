import "./css/section.css";
import "./css/section-form.css";
import { addOverlay, addOverlayBackground, showErrorMessage, removeElement, formatDate, formatTime } from "./dom";
import { todos } from "./todo";
import { addTodoForm } from "./add-todo";

export function showSections() {
    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);

    const sectionsList = document.querySelector('.sections-list');

    sections.forEach((section) => {
        const list = document.createElement('li');
        const listRight = document.createElement('div');
        const sectionIcon = document.createElement('span');
        const deleteIcon = document.createElement('span');

        list.classList.add('section-option');
        listRight.classList.add('list-right');
        sectionIcon.classList.add('material-symbols-outlined');
        deleteIcon.classList.add('material-symbols-outlined', 'section-delete');

        listRight.textContent = section;
        sectionIcon.textContent = 'tag';
        deleteIcon.textContent = 'delete';

        list.appendChild(listRight);
        list.appendChild(deleteIcon);
        listRight.prepend(sectionIcon);

        list.addEventListener('click', () => {
            showSectionPage(section);
        });

        deleteIcon.addEventListener('click', () => {
            deleteSectionConfirmation(section);
            addOverlay('.delete-confirmation');
            addOverlayBackground();
        });

        sectionsList.appendChild(list);
    });
}

function showSectionForm() {
    const sectionForm = document.createElement('form');
    const headingContainer = document.createElement('div');
    const formHeading = document.createElement('h1');
    const closeIcon = document.createElement('span');
    const nameContainer = document.createElement('div');
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');
    const buttonsContainer = document.createElement('div');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');

    formHeading.textContent = 'Add Section';
    closeIcon.textContent = 'close';
    nameLabel.htmlFor = 'name';
    nameLabel.textContent = 'Name (Max 28 characters)';
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true;
    nameInput.maxLength = '28';
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    submitButton.type = 'submit';
    submitButton.textContent = 'Add';

    sectionForm.classList.add('section-form');
    headingContainer.classList.add('heading-container');
    formHeading.classList.add('form-heading');
    closeIcon.classList.add('material-symbols-outlined', 'close-icon');
    nameContainer.classList.add('name-container');
    nameLabel.classList.add('name-label');
    nameInput.classList.add('name-input');
    buttonsContainer.classList.add('buttons-container');
    cancelButton.classList.add('cancel-button');
    submitButton.classList.add('submit-button');

    headingContainer.appendChild(formHeading);
    headingContainer.appendChild(closeIcon);
    sectionForm.appendChild(headingContainer);
    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);
    sectionForm.appendChild(nameContainer);
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(submitButton);
    sectionForm.appendChild(buttonsContainer);

    closeIcon.addEventListener('click', () => {
        removeElement('.section-form');
    });

    cancelButton.addEventListener('click', () => {
        removeElement('.section-form');
    });

    submitButton.addEventListener('click', (event) => {
        sectionSubmitClicked(event);
    })

    document.body.appendChild(sectionForm);
}

function sectionSubmitClicked(event) {
    event.preventDefault();
    const nameInput = document.querySelector('.name-input');
    const name = nameInput.value;

    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);

    if (!nameInput.checkValidity()) {
        showErrorMessage('.name-container', 'Name must not be empty!');
    } else if (sections.includes(name)) {
        showErrorMessage('.name-container', 'There is already a section with that name!');
    } else {
        addSection(name);
    }
}

function addSection(name) {
    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);

    sections.push(name);
    const stringifiedSections = JSON.stringify(sections);
    localStorage.setItem('sections', stringifiedSections);

    removeElement('.section-form');
    updateSections();
}

function updateSections() {
    const sectionsList = document.querySelector('.sections-list');

    sectionsList.replaceChildren();
    showSections();
}

function deleteSectionConfirmation(section) {
    const deleteConfirmation = document.createElement('div');
    const deleteHeading = document.createElement('h1');
    const deletePara = document.createElement('p');
    const buttonsContainer = document.createElement('div');
    const cancelButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    const deletePara1 = document.createTextNode('Doing so will permanently delete the ');
    const deletePara2 = document.createElement('strong');
    const deletePara3 = document.createTextNode(' section and all of its todos');

    deleteHeading.textContent = 'Delete Section?';
    deletePara2.textContent = section;
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';

    deleteConfirmation.classList.add('delete-confirmation');
    deleteHeading.classList.add('delete-heading');
    deletePara.classList.add('delete-para');
    buttonsContainer.classList.add('buttons-container');
    cancelButton.classList.add('cancel-button');
    deleteButton.classList.add('delete-button');
    
    deletePara.appendChild(deletePara1);
    deletePara.appendChild(deletePara2);
    deletePara.appendChild(deletePara3);

    deleteConfirmation.appendChild(deleteHeading);
    deleteConfirmation.appendChild(deletePara);
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(deleteButton);
    deleteConfirmation.appendChild(buttonsContainer);

    cancelButton.addEventListener('click', () => {
        removeElement('.delete-confirmation');
    });

    deleteButton.addEventListener('click', () => {
        deleteSection(section);
    });

    document.body.appendChild(deleteConfirmation);
}

function deleteSection(deletedSection) {
    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);
    
    const newSections = sections.filter((section) => section !== deletedSection);
    localStorage.setItem('sections', JSON.stringify(newSections));

    // code to delete all its todos will be here

    removeElement('.delete-confirmation');
    updateSections();
}

export function showSectionPage(section) {
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

        title.textContent = todo.title;
        description.textContent = todo.description;

        checkbox.classList.add('todo-checkbox');
        list.classList.add('todo-list');
        title.classList.add('todo-title');
        description.classList.add('todo-description');
        due.classList.add('todo-due');

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

        list.appendChild(informationContainer);
        todoUl.appendChild(list);
    });

    main.appendChild(sectionHeading);
    main.appendChild(todoUl);
    createAddTask();
}

export function createAddTask() {
    const todoUl = document.querySelector('.todo-ul');
    const addTodoList = document.querySelector('.add-todo-list');
    const list = document.createElement('li');
    const listIcon = document.createElement('span');

    if (addTodoList) addTodoList.remove();

    list.textContent = 'Add todo';
    listIcon.textContent = 'add';

    list.classList.add('add-todo-list');
    listIcon.classList.add('material-symbols-outlined', 'add-todo-icon');

    list.addEventListener('click', () => {
        list.replaceChildren();
        todoUl.appendChild(addTodoForm());
    });

    list.prepend(listIcon);
    todoUl.appendChild(list);
}

(function addSectionListener() {
    const sectionAdd = document.querySelector('.section-add');
    sectionAdd.addEventListener('click', () => {
        showSectionForm();
        addOverlay('.section-form');
        addOverlayBackground();
    }); 
})();