import { removeElement, showDropdown, showErrorMessage, getCurrentDate } from "./dom.js";

export function addTodoForm() {
    const main = document.querySelector('.main');
    const formContainer = document.createElement('div');

    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const dateLabel = document.createElement('label');
    const timeLabel = document.createElement('label');
    const priorityLabel = document.createElement('label');
    const sectionLabel = document.createElement('label');
    const buttonsContainer = document.createElement('div');
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
    buttonsContainer.classList.add('buttons-container');
    cancelButton.classList.add('cancel-button');
    submitButton.classList.add('submit-button');

    formContainer.appendChild(titleLabel);
    formContainer.appendChild(titleInput);
    formContainer.appendChild(descriptionLabel);
    formContainer.appendChild(descriptionInput);
    formContainer.appendChild(dateLabel);
    formContainer.appendChild(dateSelect());
    formContainer.appendChild(timeLabel);
    formContainer.appendChild(timeSelect());
    formContainer.appendChild(priorityLabel);
    formContainer.appendChild(prioritySelect());
    formContainer.appendChild(sectionLabel);
    formContainer.appendChild(sectionSelect());
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(submitButton);
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
    const currentPriority = document.createElement('button');
    const currentPriorityIcon = document.createElement('span');

    currentPriority.id = 'priority';
    currentPriority.name = 'priority';
    currentPriority.type = 'button';
    currentPriority.textContent = 'none';
    currentPriorityIcon.classList.add('material-symbols-outlined');
    currentPriorityIcon.textContent = 'do_not_disturb_on';

    priorityContainer.classList.add('priority-container');
    currentPriority.classList.add('current-priority');
    currentPriorityIcon.classList.add('current-priority-icon');

    currentPriority.prepend(currentPriorityIcon);
    priorityContainer.appendChild(currentPriority);

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
    const currentPriority = document.querySelector('.current-priority');
    const currentPriorityIcon = document.querySelector('.current-priority-icon');
    currentPriority.textContent = option.priority;
    currentPriorityIcon.textContent = option.icon;

    // since textcontent erases all descendants
    // we will have to prepend currentPriorityIcon again
    currentPriority.prepend(currentPriorityIcon);
}

function dateSelect() {
    const dateContainer = document.createElement('div');
    const dateButton = document.createElement('button');
    const dateIcon = document.createElement('span');

    dateButton.id = 'date';
    dateButton.name = 'date';
    dateButton.type = 'button';
    dateButton.textContent = 'Date';
    dateIcon.classList.add('material-symbols-outlined');
    dateIcon.textContent = 'edit_calendar';

    dateContainer.classList.add('date-container');
    dateButton.classList.add('current-date');
    dateIcon.classList.add('date-icon');

    dateButton.prepend(dateIcon);
    dateContainer.appendChild(dateButton);

    dateButton.addEventListener('click', () => {
        showDropdown('.date-container', '.date-dropdown', dateDropdown);
    });

    return dateContainer;
}

function dateDropdown() {
    const currentDate = getCurrentDate();

    const dateDropdown = document.createElement('div');
    const dateInput = document.createElement('input');
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

    dateDropdown.appendChild(dateInput);
    dateDropdown.appendChild(dateCancel);
    dateDropdown.appendChild(dateSubmit);

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
    const dateButton = document.querySelector('.current-date');
    const dateInput = document.querySelector('.date-input');
    const dateIcon = document.querySelector('.date-icon');

    //use date-fns later to format
    dateButton.textContent = dateInput.value;
    dateButton.prepend(dateIcon);

    removeElement('.date-dropdown');
}

function timeSelect() {
    const timeContainer = document.createElement('div');
    const timeButton = document.createElement('button');
    const timeIcon = document.createElement('span');

    timeButton.id = 'time';
    timeButton.name = 'time';
    timeButton.type = 'button';
    timeButton.textContent = 'Time';
    timeIcon.classList.add('material-symbols-outlined');
    timeIcon.textContent = 'schedule';

    timeContainer.classList.add('time-container');
    timeButton.classList.add('current-time');
    timeIcon.classList.add('time-icon');

    timeButton.prepend(timeIcon);
    timeContainer.appendChild(timeButton);

    timeButton.addEventListener('click', () => {
        showDropdown('.time-container', '.time-dropdown', timeDropdown);
    });

    return timeContainer;
}

function timeDropdown() {
    const timeDropdown = document.createElement('div');
    const timeInput = document.createElement('input');
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

    timeDropdown.appendChild(timeInput);
    timeDropdown.appendChild(timeCancel);
    timeDropdown.appendChild(timeSubmit);

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
    const timeButton = document.querySelector('.current-time');
    const timeInput = document.querySelector('.time-input');
    const timeIcon = document.querySelector('.time-icon');

    //use date-fns later to format
    timeButton.textContent = timeInput.value;
    timeButton.prepend(timeIcon);

    removeElement('.time-dropdown');
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
    sectionButton.textContent = sections[0];
    sectionIcon.classList.add('material-symbols-outlined');
    sectionIcon.textContent = 'tag';

    sectionContainer.classList.add('section-container');
    sectionButton.classList.add('current-section');
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
        list.classList.add('section-list');
        list.textContent = section;

        list.addEventListener('click', () => {
            updateSectionButton(section);
        });

        sectionUl.appendChild(list);
    });

    sectionDropdown.appendChild(sectionUl);
    return sectionDropdown;
}

function updateSectionButton(section) {
    const sectionButton = document.querySelector('.current-section');
    const sectionIcon = document.querySelector('.section-icon');

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