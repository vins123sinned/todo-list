import "./css/add-todo.css";
import { removeElement, showDropdown, showErrorMessage, getCurrentDate, formatDate, formatTime } from "./dom.js";
import { todos, pushNewTodo } from "./todo.js";
import { createAddTask, showSectionPage } from "./section.js";

export function addTodoForm(section) {
    const formContainer = document.createElement('form');

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
    const submitButton = document.createElement('input');

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
    buttonsSelectContainer.appendChild(prioritySelect('none'));
    buttonsSelectContainer.appendChild(moreButton());
    formContainer.appendChild(buttonsSelectContainer);
    buttonsContainer.appendChild(sectionLabel);
    buttonsContainer.appendChild(sectionSelect(section));
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

    return formContainer;
}

export function editTodoForm(todo) {
    const formContainer = document.createElement('form');
    const main = document.querySelector('.main');

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
    const submitButton = document.createElement('input');

    //maybe section
    titleLabel.htmlFor = 'title';
    titleLabel.textContent = 'Title'
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    titleInput.placeholder = 'Get good at programming!';
    titleInput.value = todo.title;
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.textContent = 'Description';
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.name = 'title';
    descriptionInput.placeholder = 'Description';
    descriptionInput.value = todo.description;
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
    buttonsSelectContainer.appendChild(dateSelect(todo.date));
    buttonsSelectContainer.appendChild(timeLabel);
    buttonsSelectContainer.appendChild(timeSelect(todo.time));
    buttonsSelectContainer.appendChild(priorityLabel);
    buttonsSelectContainer.appendChild(prioritySelect(todo.priority));
    buttonsSelectContainer.appendChild(moreButton());
    formContainer.appendChild(buttonsSelectContainer);
    buttonsContainer.appendChild(sectionLabel);
    buttonsContainer.appendChild(sectionSelect(todo.section));
    cancelSubmitContainer.appendChild(cancelButton);
    cancelSubmitContainer.appendChild(submitButton);
    buttonsContainer.appendChild(cancelSubmitContainer);
    formContainer.appendChild(buttonsContainer);

    titleInput.addEventListener('input', (event) => {
        titleInputChanged(event);
    });
    
    cancelButton.addEventListener('click', () => {
        removeAddTodo();

        main.replaceChildren();
        showSectionPage(todo.section);
    });

    submitButton.addEventListener('click', (event) => {
        sendUpdateTodo(event, todo.id);
    })

    return formContainer;
}

function prioritySelect(priority) {
    // creates priority button on addTodo form
    const priorityContainer = document.createElement('div');
    const priorityButtonContainer = document.createElement('div');
    const currentPriority = document.createElement('button');
    const currentPriorityIcon = document.createElement('span');

    currentPriority.id = 'priority';
    currentPriority.name = 'priority';
    currentPriority.type = 'button';
    currentPriority.dataset.priority = priority;
    currentPriority.textContent = priority;
    currentPriorityIcon.classList.add('material-symbols-outlined');
    currentPriorityIcon.textContent = 'do_not_disturb_on';

    priorityContainer.classList.add('priority-container');
    priorityButtonContainer.classList.add('date-button-container');
    currentPriority.classList.add('priority-button', `priority-button-${priority}`);
    currentPriorityIcon.classList.add('priority-icon');

    currentPriority.prepend(currentPriorityIcon);
    priorityButtonContainer.appendChild(currentPriority);
    priorityContainer.appendChild(priorityButtonContainer);

    currentPriority.addEventListener('click', () => {
        showDropdown('.priority-container', '.priority-dropdown', priorityDropdown, priority);
    });

    return priorityContainer;
}

function priorityDropdown() {
    const currentPriority = document.querySelector('.priority-button').dataset.priority;
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
            priority: 'low',
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

        list.classList.add('priority-option', `priority-${option.priority}`);
        list.textContent = option.priority;
        listIcon.classList.add('material-symbols-outlined');
        listIcon.textContent = option.icon;

        list.addEventListener('click', () => {
            changeCurrentPriority(option);
            removeElement('.priority-dropdown');
        })

        list.prepend(listIcon);
        if (option.priority === currentPriority) {
            const listCheckmark = document.createElement('span');
            listCheckmark.classList.add('material-symbols-outlined', 'priority-checkmark');
            listCheckmark.textContent = 'check';

            list.appendChild(listCheckmark);
        }
        priorityOptions.appendChild(list);
    });

    priorityDropdown.appendChild(priorityOptions);
    return priorityDropdown;
}

function changeCurrentPriority(option) {
    const currentPriority = document.querySelector('.priority-button');
    const currentPriorityIcon = document.querySelector('.priority-icon');
    
    currentPriority.classList.remove(`priority-button-${currentPriority.dataset.priority}`);
    currentPriority.classList.add(`priority-button-${option.priority}`);
    currentPriority.dataset.priority = option.priority;
    currentPriority.textContent = option.priority;
    currentPriorityIcon.textContent = option.icon;

    // since textcontent erases all descendants
    // we will have to prepend currentPriorityIcon again
    currentPriority.prepend(currentPriorityIcon);
}

function dateSelect(date) {
    const dateContainer = document.createElement('div');
    const dateButtonContainer = document.createElement('div');
    const dateButton = document.createElement('button');
    const dateIcon = document.createElement('span');

    dateButton.id = 'date';
    dateButton.name = 'date';
    dateButton.type = 'button';
    dateIcon.classList.add('material-symbols-outlined');
    dateIcon.textContent = 'edit_calendar';

    dateContainer.classList.add('date-container');
    dateButtonContainer.classList.add('date-button-container');
    dateButton.classList.add('date-button');
    dateIcon.classList.add('material-symbols-outlined', 'date-icon');

    dateButtonContainer.appendChild(dateButton);
    dateContainer.appendChild(dateButtonContainer);

    dateButton.addEventListener('click', () => {
        showDropdown('.date-container', '.date-dropdown', dateDropdown);
    });
    
    if (date) {
        const closeIcon = document.createElement('span');

        dateButton.textContent = formatDate(date);
        dateButton.dataset.date = date;
        closeIcon.textContent = 'close';
        closeIcon.classList.add('material-symbols-outlined', 'date-close-icon');

        closeIcon.addEventListener('click', () => {
            resetDateButton();
        });

        dateButton.prepend(dateIcon);
        dateButtonContainer.appendChild(closeIcon);
    } else {
        dateButton.textContent = 'Date';
        dateButton.prepend(dateIcon);
    }

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
    closeIcon.classList.add('material-symbols-outlined', 'date-close-icon');
    closeIcon.textContent = 'close';

    dateButton.dataset.date = dateInput.value;
    dateButton.textContent = formatDate(dateInput.value);
    dateButton.prepend(dateIcon);
    if (!document.querySelector('.date-close-icon')) dateButtonContainer.appendChild(closeIcon);

    closeIcon.addEventListener('click', () => {
        resetDateButton();
    });

    removeElement('.date-dropdown');
}

function resetDateButton() {
    const dateButton = document.querySelector('.date-button');
    const dateIcon = document.querySelector('.date-icon');
    const closeIcon = document.querySelector('.date-close-icon');

    dateButton.removeAttribute('data-date');
    dateButton.textContent = 'Date';
    dateButton.prepend(dateIcon);
    closeIcon.remove();
}

function timeSelect(time) {
    const timeContainer = document.createElement('div');
    const timeButtonContainer = document.createElement('div');
    const timeButton = document.createElement('button');
    const timeIcon = document.createElement('span');

    timeButton.id = 'time';
    timeButton.name = 'time';
    timeButton.type = 'button';
    timeIcon.classList.add('material-symbols-outlined');
    timeIcon.textContent = 'schedule';

    timeContainer.classList.add('time-container');
    timeButtonContainer.classList.add('time-button-container');
    timeButton.classList.add('time-button');
    timeIcon.classList.add('time-icon');

    timeButtonContainer.appendChild(timeButton);
    timeContainer.appendChild(timeButtonContainer);

    timeButton.addEventListener('click', () => {
        showDropdown('.time-container', '.time-dropdown', timeDropdown);
    });

    if (time) {
        const closeIcon = document.createElement('span');

        timeButton.textContent = formatTime(time);
        timeButton.dataset.time = time;
        closeIcon.textContent = 'close';
        closeIcon.classList.add('material-symbols-outlined', 'time-close-icon');

        closeIcon.addEventListener('click', () => {
            resetTimeButton();
        });

        timeButton.prepend(timeIcon);
        timeButtonContainer.appendChild(closeIcon);
    } else {
        timeButton.textContent = 'Time';
        timeButton.prepend(timeIcon);
    }

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
    closeIcon.classList.add('material-symbols-outlined', 'time-close-icon');
    closeIcon.textContent = 'close';

    timeButton.dataset.time = timeInput.value;
    timeButton.textContent = formatTime(timeInput.value);
    timeButton.prepend(timeIcon);
    if (!document.querySelector('.time-close-icon')) timeButtonContainer.appendChild(closeIcon);

    closeIcon.addEventListener('click', () => {
        resetTimeButton();
    });

    removeElement('.time-dropdown');
}

function resetTimeButton() {
    const timeButton = document.querySelector('.time-button');
    const timeIcon = document.querySelector('.time-icon');
    const closeIcon = document.querySelector('.time-close-icon');

    timeButton.removeAttribute('data-time');
    timeButton.textContent = 'Time';
    timeButton.prepend(timeIcon);
    closeIcon.remove();
}

function sectionSelect(section) {
    const sectionContainer = document.createElement('div');
    const sectionButton = document.createElement('button');
    const sectionIcon = document.createElement('span');

    sectionButton.id = 'section';
    sectionButton.name = 'section';
    sectionButton.type = 'button';
    sectionButton.dataset.section = section;
    sectionButton.textContent = section;
    sectionIcon.textContent = 'tag';

    sectionContainer.classList.add('section-container');
    sectionButton.classList.add('section-button');
    sectionIcon.classList.add('material-symbols-outlined', 'section-icon');

    sectionButton.prepend(sectionIcon);
    sectionContainer.appendChild(sectionButton);

    sectionButton.addEventListener('click', () => {
        sectionButton.classList.add('section-button-clicked');
        showDropdown('.section-container', '.section-dropdown', sectionsDropdown);
    });

    return sectionContainer;
}

function sectionsDropdown() {
    const currentSection = document.querySelector('.section-button').dataset.section;
    const getSections = localStorage.getItem('sections');
    const sections = JSON.parse(getSections);

    const sectionDropdown = document.createElement('div');
    const sectionUl = document.createElement('ul');

    sectionDropdown.classList.add('section-dropdown');

    sections.forEach((section) => {
        const list = document.createElement('li');
        const listIcon = document.createElement('span');
        let listCheckmark;
        if (section === currentSection) {
            listCheckmark = document.createElement('span');
            listCheckmark.classList.add('material-symbols-outlined', 'section-checkmark');
            listCheckmark.textContent = 'check';
        }

        list.classList.add('section-list');
        list.textContent = section;
        listIcon.classList.add('material-symbols-outlined');
        listIcon.textContent = 'tag';

        list.addEventListener('click', () => {
            updateSectionButton(section);
        });

        list.prepend(listIcon);
        if (listCheckmark) list.appendChild(listCheckmark);
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

function moreButton() {
    const moreContainer = document.createElement('div');
    const moreButton = document.createElement('button');
    const moreIcon = document.createElement('span');

    moreButton.type = 'button';
    moreIcon.textContent = 'more_horiz';

    moreContainer.classList.add('more-container');
    moreButton.classList.add('more-button');
    moreIcon.classList.add('material-symbols-outlined', 'more-icon');

    moreButton.prepend(moreIcon);
    moreContainer.appendChild(moreButton);

    moreButton.addEventListener('click', () => {
        showDropdown('.more-container', '.more-dropdown', moreDropdown);
    });

    return moreContainer;
}

function moreDropdown() {
    const moreDropdown = document.createElement('div');
    const morePara1 = document.createElement('p');
    const morePara2 = document.createElement('p');

    morePara1.textContent = 'Nothing to see here!';
    morePara2.textContent = 'This is just for looks 😎';

    moreDropdown.classList.add('more-dropdown');

    moreDropdown.appendChild(morePara1);
    moreDropdown.appendChild(morePara2);
    return moreDropdown;
}

function removeAddTodo() {
    const formContainer = document.querySelector('.form-container');
    formContainer.remove();
    
    createAddTask();
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

function sendUpdateTodo(event, id) {
    event.preventDefault();

    const main = document.querySelector('.main');
    const currentSection = document.querySelector('.section-page-heading').textContent;
    const todo = todos.find((todo) => todo.id === id);

    const title = document.querySelector('.title-input').value;
    const description = document.querySelector('.description-input').value;
    const date = document.querySelector('.date-button').dataset.date ?? '';
    const time = document.querySelector('.time-button').dataset.time ?? '';
    const priority = document.querySelector('.priority-button').dataset.priority;
    const section = document.querySelector('.section-button').dataset.section;

    todo.updateTodo(title, description, date, time, priority, section);
    main.replaceChildren();
    showSectionPage(currentSection);
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