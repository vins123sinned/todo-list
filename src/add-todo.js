import "./css/add-todo.css";
import { removeElement, showDropdown, showErrorMessage, getCurrentDate, formatDate, formatTime } from "./dom.js";
import { pushNewTodo } from "./todo.js";

export function addTodoForm() {
    const main = document.querySelector('.main');
    const formContainer = document.createElement('div');

    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const buttonsSelectContainer = document.createElement('div');
    const dateLabel = document.createElement('label');
    const timeLabel = document.createElement('label');
    const priorityLabel = document.createElement('label');
    const sectionLabel = document.createElement('label');
    const buttonsContainer = document.createElement('div');
    const cancelSubmitContainer = document.createElement('div');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');

    //maybe section
    titleLabel.htmlFor = 'title';
    titleLabel.textContent = 'Title'
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    titleInput.placeholder = 'Get good at programming!';
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.textContent = 'Description';
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.name = 'title';
    descriptionInput.placeholder = 'Description';
    dateLabel.htmlFor = 'date';
    dateLabel.textContent = 'Date';
    timeLabel.htmlFor = 'time';
    timeLabel.textContent = 'Time';
    priorityLabel.htmlFor = 'priority';
    priorityLabel.textContent = 'Priority';
    sectionLabel.htmlFor = 'section';
    sectionLabel.textContent = "Section";
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    submitButton.type = 'submit';
    submitButton.textContent = 'Add todo';
    submitButton.disabled = true;

    titleInput.classList.add('title-input');
    descriptionInput.classList.add('description-input');
    formContainer.classList.add('form-container');
    buttonsSelectContainer.classList.add('buttons-select-container');
    buttonsContainer.classList.add('buttons-container');
    cancelButton.classList.add('cancel-button');
    submitButton.classList.add('submit-button');

    formContainer.appendChild(titleLabel);
    formContainer.appendChild(titleInput);
    formContainer.appendChild(descriptionLabel);
    formContainer.appendChild(descriptionInput);
    buttonsSelectContainer.appendChild(dateLabel);
    buttonsSelectContainer.appendChild(dateSelect());
    buttonsSelectContainer.appendChild(timeLabel);
    buttonsSelectContainer.appendChild(timeSelect());
    buttonsSelectContainer.appendChild(priorityLabel);
    buttonsSelectContainer.appendChild(prioritySelect());
    formContainer.appendChild(buttonsSelectContainer);
    buttonsContainer.appendChild(sectionLabel);
    buttonsContainer.appendChild(sectionSelect());
    cancelSubmitContainer.appendChild(cancelButton);
    cancelSubmitContainer.appendChild(submitButton);
    buttonsContainer.appendChild(cancelSubmitContainer);
    formContainer.appendChild(buttonsContainer);

    titleInput.addEventListener('input', (event) => {
        titleInputChanged(event);
    });
    
    cancelButton.addEventListener('click', () => {
        removeAddTodo();
    });

    submitButton.addEventListener('click', (event) => {
        addTodo(event);
    })

    main.appendChild(formContainer);
}

function prioritySelect() {
    // creates priority button on addTodo form
    const priorityContainer = document.createElement('div');
    const priorityButtonContainer = document.createElement('div');
    const currentPriority = document.createElement('button');
    const currentPriorityIcon = document.createElement('span');

    currentPriority.id = 'priority';
    currentPriority.name = 'priority';
    currentPriority.type = 'button';
    currentPriority.dataset.priority = 'none';
    currentPriority.textContent = 'none';
    currentPriorityIcon.classList.add('material-symbols-outlined');
    currentPriorityIcon.textContent = 'do_not_disturb_on';

    priorityContainer.classList.add('priority-container');
    priorityButtonContainer.classList.add('date-button-container');
    currentPriority.classList.add('priority-button');
    currentPriorityIcon.classList.add('priority-icon');

    currentPriority.prepend(currentPriorityIcon);
    priorityButtonContainer.appendChild(currentPriority);
    priorityContainer.appendChild(priorityButtonContainer);

    currentPriority.addEventListener('click', () => {
        showDropdown('.priority-container', '.priority-dropdown', priorityDropdown);
    });

    return priorityContainer;
}

function priorityDropdown() {
    const options = [
        {
            priority: 'urgent',
            icon: 'e911_emergency',
        }, 
        {
            priority: 'important',
            icon: 'priority_high',
        },
        {
            priority: 'low priority',
            icon: 'low_priority'
        }, 
        {
            priority: 'none',
            icon: 'do_not_disturb_on',
        },
    ];

    const priorityDropdown = document.createElement('div')
    const priorityOptions = document.createElement('ul');

    priorityDropdown.classList.add('priority-dropdown');
    priorityOptions.classList.add('priority-options');

    options.forEach((option) => {
        const list = document.createElement('li');
        const listIcon = document.createElement('span');

        list.classList.add('priority-option');
        list.textContent = option.priority;
        listIcon.classList.add('material-symbols-outlined');
        listIcon.textContent = option.icon;

        list.addEventListener('click', () => {
            changeCurrentPriority(option);
            removeElement('.priority-dropdown');
        })

        list.prepend(listIcon);
        priorityOptions.appendChild(list);
    });

    priorityDropdown.appendChild(priorityOptions);
    return priorityDropdown;
}

function changeCurrentPriority(option) {
    const currentPriority = document.querySelector('.priority-button');
    const currentPriorityIcon = document.querySelector('.priority-icon');
    
    currentPriority.dataset.priority = option.priority;
    currentPriority.textContent = option.priority;
    currentPriorityIcon.textContent = option.icon;

    // since textcontent erases all descendants
    // we will have to prepend currentPriorityIcon again
    currentPriority.prepend(currentPriorityIcon);
}

function dateSelect() {
    const dateContainer = document.createElement('div');
    const dateButtonContainer = document.createElement('div');
    const dateButton = document.createElement('button');
    const dateIcon = document.createElement('span');

    dateButton.id = 'date';
    dateButton.name = 'date';
    dateButton.type = 'button';
    dateButton.textContent = 'Date';
    dateIcon.classList.add('material-symbols-outlined');
    dateIcon.textContent = 'edit_calendar';

    dateContainer.classList.add('date-container');
    dateButtonContainer.classList.add('date-button-container');
    dateButton.classList.add('date-button');
    dateIcon.classList.add('date-icon');

    dateButton.prepend(dateIcon);
    dateButtonContainer.appendChild(dateButton);
    dateContainer.appendChild(dateButtonContainer);

    dateButton.addEventListener('click', () => {
        showDropdown('.date-container', '.date-dropdown', dateDropdown);
    });

    return dateContainer;
}

function dateDropdown() {
    const currentDate = getCurrentDate();

    const dateDropdown = document.createElement('div');
    const dateInput = document.createElement('input');
    const dropdownButtonsContainer = document.createElement('div');
    const dateCancel = document.createElement('button');
    const dateSubmit = document.createElement('button');

    dateInput.type = 'date';
    dateInput.id = 'date';
    dateInput.name = 'date';
    dateInput.value = currentDate;
    dateInput.min = currentDate;
    dateInput.required = true;
    dateCancel.type = 'button';
    dateCancel.textContent = 'Cancel';
    dateSubmit.type = 'button';
    dateSubmit.textContent = 'Submit';

    dateDropdown.classList.add('date-dropdown');
    dateInput.classList.add('date-input');
    dropdownButtonsContainer.classList.add('dropdown-buttons-container');
    dateCancel.classList.add('dropdown-cancel');
    dateSubmit.classList.add('dropdown-submit');

    dateDropdown.appendChild(dateInput);
    dropdownButtonsContainer.appendChild(dateCancel);
    dropdownButtonsContainer.appendChild(dateSubmit);
    dateDropdown.appendChild(dropdownButtonsContainer);

    dateCancel.addEventListener('click', () => {
        removeElement('.date-dropdown');
    });

    dateSubmit.addEventListener('click', () => {
        dateSubmitClicked();
    });

    return dateDropdown;
}

function dateSubmitClicked() {
    const dateInput = document.querySelector('.date-input');
    
    if (!dateInput.checkValidity()) {
        showErrorMessage('.date-dropdown', 'Date is invalid!');
    } else {
        updateDateButton();
    }
}

function updateDateButton() {
    const dateButtonContainer = document.querySelector('.date-button-container');
    const dateButton = document.querySelector('.date-button');
    const dateInput = document.querySelector('.date-input');
    const dateIcon = document.querySelector('.date-icon');

    const closeIcon = document.createElement('span');
    closeIcon.classList.add('material-symbols-outlined', 'datetime-icon');
    closeIcon.textContent = 'close';

    dateButton.dataset.date = dateInput.value;
    dateButton.textContent = formatDate(dateInput.value);
    dateButton.prepend(dateIcon);
    if (!document.querySelector('.datetime-icon')) dateButtonContainer.appendChild(closeIcon);

    closeIcon.addEventListener('click', () => {
        resetDateButton();
    });

    removeElement('.date-dropdown');
}

function resetDateButton() {
    const dateButton = document.querySelector('.date-button');
    const dateIcon = document.querySelector('.date-icon');
    const closeIcon = document.querySelector('.datetime-icon');

    dateButton.removeAttribute('data-date');
    dateButton.textContent = 'Date';
    dateButton.prepend(dateIcon);
    closeIcon.remove();
}

function timeSelect() {
    const timeContainer = document.createElement('div');
    const timeButtonContainer = document.createElement('div');
    const timeButton = document.createElement('button');
    const timeIcon = document.createElement('span');

    timeButton.id = 'time';
    timeButton.name = 'time';
    timeButton.type = 'button';
    timeButton.textContent = 'Time';
    timeIcon.classList.add('material-symbols-outlined');
    timeIcon.textContent = 'schedule';

    timeContainer.classList.add('time-container');
    timeButtonContainer.classList.add('time-button-container');
    timeButton.classList.add('time-button');
    timeIcon.classList.add('time-icon');

    timeButton.prepend(timeIcon);
    timeButtonContainer.appendChild(timeButton);
    timeContainer.appendChild(timeButtonContainer);

    timeButton.addEventListener('click', () => {
        showDropdown('.time-container', '.time-dropdown', timeDropdown);
    });

    return timeContainer;
}

function timeDropdown() {
    const timeDropdown = document.createElement('div');
    const timeInput = document.createElement('input');
    const dropdownButtonsContainer = document.createElement('div');
    const timeCancel = document.createElement('button');
    const timeSubmit = document.createElement('button');

    timeInput.type = 'time';
    timeInput.id = 'time';
    timeInput.name = 'time';
    timeInput.required = true;
    timeCancel.type = 'button';
    timeCancel.textContent = 'Cancel';
    timeSubmit.type = 'button';
    timeSubmit.textContent = 'Submit';

    timeDropdown.classList.add('time-dropdown');
    timeInput.classList.add('time-input');
    dropdownButtonsContainer.classList.add('dropdown-buttons-container');
    timeCancel.classList.add('dropdown-cancel');
    timeSubmit.classList.add('dropdown-submit');

    timeDropdown.appendChild(timeInput);
    dropdownButtonsContainer.appendChild(timeCancel);
    dropdownButtonsContainer.appendChild(timeSubmit);
    timeDropdown.appendChild(dropdownButtonsContainer);

    timeCancel.addEventListener('click', () => {
        removeElement('.time-dropdown');
    });

    timeSubmit.addEventListener('click', () => {
        timeSubmitClicked();
    });

    return timeDropdown;
}

function timeSubmitClicked() {
    const timeInput = document.querySelector('.time-input');

    if (!timeInput.checkValidity()) {
        showErrorMessage('.time-dropdown', 'Time is invalid!');
    } else {
        updateTimeButton();
    }
}

function updateTimeButton() {
    const timeButtonContainer = document.querySelector('.time-button-container');
    const timeButton = document.querySelector('.time-button');
    const timeInput = document.querySelector('.time-input');
    const timeIcon = document.querySelector('.time-icon');

    const closeIcon = document.createElement('span');
    closeIcon.classList.add('material-symbols-outlined', 'datetime-icon');
    closeIcon.textContent = 'close';

    timeButton.dataset.time = timeInput.value;
    timeButton.textContent = formatTime(timeInput.value);
    timeButton.prepend(timeIcon);
    if (!document.querySelector('.datetime-icon')) timeButtonContainer.appendChild(closeIcon);

    closeIcon.addEventListener('click', () => {
        resetTimeButton();
    });

    removeElement('.time-dropdown');
}

function resetTimeButton() {
    const timeButton = document.querySelector('.time-button');
    const timeIcon = document.querySelector('.time-icon');
    const closeIcon = document.querySelector('.datetime-icon');

    timeButton.removeAttribute('data-time');
    timeButton.textContent = 'Time';
    timeButton.prepend(timeIcon);
    closeIcon.remove();
}

function sectionSelect() {
    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);

    const sectionContainer = document.createElement('div');
    const sectionButton = document.createElement('button');
    const sectionIcon = document.createElement('span');

    sectionButton.id = 'section';
    sectionButton.name = 'section';
    sectionButton.type = 'button';
    sectionButton.dataset.section = sections[0];
    sectionButton.textContent = sections[0];
    sectionIcon.classList.add('material-symbols-outlined');
    sectionIcon.textContent = 'tag';

    sectionContainer.classList.add('section-container');
    sectionButton.classList.add('section-button');
    sectionIcon.classList.add('section-icon');

    sectionButton.prepend(sectionIcon);
    sectionContainer.appendChild(sectionButton);

    sectionButton.addEventListener('click', () => {
        showDropdown('.section-container', '.section-dropdown', sectionsDropdown)
    });

    return sectionContainer;
}

function sectionsDropdown() {
    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);

    const sectionDropdown = document.createElement('div');
    const sectionUl = document.createElement('ul');

    sectionDropdown.classList.add('section-dropdown');

    sections.forEach((section) => {
        const list = document.createElement('li');
        const listIcon = document.createElement('span');

        list.classList.add('section-list');
        list.textContent = section;
        listIcon.classList.add('material-symbols-outlined');
        listIcon.textContent = 'tag';

        list.addEventListener('click', () => {
            updateSectionButton(section);
        });

        list.prepend(listIcon);
        sectionUl.appendChild(list);
    });

    sectionDropdown.appendChild(sectionUl);
    return sectionDropdown;
}

function updateSectionButton(section) {
    const sectionButton = document.querySelector('.section-button');
    const sectionIcon = document.querySelector('.section-icon');

    sectionButton.dataset.section = section;
    sectionButton.textContent = section;
    sectionButton.prepend(sectionIcon);

    removeElement('.section-dropdown');
}

function removeAddTodo() {
    const formContainer = document.querySelector('.form-container');
    formContainer.remove();
}

function addTodo(event) {
    event.preventDefault(); 

    const title = document.querySelector('.title-input').value;
    const description = document.querySelector('.description-input').value;
    const date = document.querySelector('.date-button').dataset.date ?? '';
    const time = document.querySelector('.time-button').dataset.time ?? '';
    const priority = document.querySelector('.priority-button').dataset.priority;
    const section = document.querySelector('.section-button').dataset.section;

    pushNewTodo(title, description, date, time, priority, section);
}

function titleInputChanged(event) {
    const submitButton = document.querySelector('.submit-button');
    const titleValue = event.target.value;

    if (titleValue.length > 0) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}