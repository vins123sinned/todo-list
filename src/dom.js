export function addTodo() {
    const main = document.querySelector('.main');
    const formContainer = document.createElement('div');

    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');

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

    formContainer.classList.add('form-container');

    formContainer.appendChild(titleLabel);
    formContainer.appendChild(titleInput);
    formContainer.appendChild(descriptionLabel);
    formContainer.appendChild(descriptionInput);
    formContainer.appendChild(dateSelect());
    formContainer.appendChild(prioritySelect());

    main.appendChild(formContainer);
}

function prioritySelect() {
    // creates priority button on addTodo form
    const priorityContainer = document.createElement('div');
    const currentPriority = document.createElement('button');
    const currentPriorityIcon = document.createElement('span');

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
        const getOptionsContainer = document.querySelector('.options-container');
        if (!priorityContainer.contains(getOptionsContainer)) {
            priorityContainer.appendChild(priorityOptions());
            addOverlay('.options-container');
        }
    });

    return priorityContainer;
}

function priorityOptions() {
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

    const optionsContainer = document.createElement('div')
    const priorityOptions = document.createElement('ul');

    optionsContainer.classList.add('options-container');
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
            removeElement('.options-container');
        })

        list.prepend(listIcon);
        priorityOptions.appendChild(list);
    });

    optionsContainer.appendChild(priorityOptions);
    return optionsContainer;
}

function changeCurrentPriority(option) {
    const currentPriority = document.querySelector('.current-priority');
    const currentPriorityIcon = document.querySelector('.current-priority-icon');
    currentPriority.textContent = option.priority;
    currentPriorityIcon.textContent = option.icon;

    // since textcontent erases all descendants
    // we will have to prepend currentPriorityIcon again
    currentPriority.prepend(currentPriorityIcon);

    removeOverlay();
}

function dateSelect() {
    const dateContainer = document.createElement('div');
    const dateButton = document.createElement('button');
    const dateIcon = document.createElement('span');

    dateButton.type = 'button';
    dateButton.textContent = 'Date';
    dateIcon.classList.add('material-symbols-outlined');
    dateIcon.textContent = 'edit_calendar';

    dateButton.classList.add('current-date');
    dateIcon.classList.add('date-icon');

    dateButton.prepend(dateIcon);
    dateContainer.appendChild(dateButton);

    dateButton.addEventListener('click', () => {
        const getDateDropdown = document.querySelector('.date-dropdown');
        if (!dateContainer.contains(getDateDropdown)) {
            dateContainer.appendChild(dateDropdown());
            addOverlay('.date-dropdown');
        }
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
        removeDateDropdown();
    });

    dateSubmit.addEventListener('click', () => {
        dateSubmitClicked();
    });

    return dateDropdown;
}

function addOverlay(elementName) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.addEventListener('click', () => {
        removeElement(elementName);
        removeOverlay();
    });

    document.body.appendChild(overlay);
}

function removeElement(elementName) {
    const element = document.querySelector(elementName);
    element.remove();
}

function removeOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.remove();
}

function getCurrentDate() {
    const date = new Date();

    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    if (month.length === 1) {
        month = '0' + month;
    } else if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

function removeDateDropdown() {
    removeElement('.date-dropdown');
    removeOverlay();
}

function dateSubmitClicked() {
    const dateDropdown = document.querySelector('.date-dropdown');
    const dateInput = document.querySelector('.date-input');
    
    if (!dateInput.checkValidity()) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('.error-message');
        errorMessage.textContent = 'Date is invalid!';

        dateDropdown.appendChild(errorMessage);
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

    removeDateDropdown();
}