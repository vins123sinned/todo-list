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
    formContainer.appendChild(timeSelect());
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

    removeElement('.time-dropdown');;
}

function addOverlay(elementName) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.addEventListener('click', () => {
        removeElement(elementName);
    });

    document.body.appendChild(overlay);
}

function addOverlayBackground() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay-background');
}

function removeElement(elementName) {
    const element = document.querySelector(elementName);
    const overlay = document.querySelector('.overlay');

    element.remove();
    if (overlay) overlay.remove();
}

function showDropdown(containerName, dropdownName, dropdownFunction) {
    const container = document.querySelector(containerName);
    const dropdown = document.querySelector(dropdownName);

    if (!container.contains(dropdown)) {
        container.appendChild(dropdownFunction());
        addOverlay(dropdownName);
    }
}

function showErrorMessage(elementName, message) {
    if (document.querySelector('.error-message')) return;

    const errorMessage = document.createElement('p');
    const element = document.querySelector(elementName);

    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    element.appendChild(errorMessage);
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

// section form

(function addSectionListener() {
    const sectionAdd = document.querySelector('.section-add');
    sectionAdd.addEventListener('click', () => {
        showSectionForm();
        addOverlay('.section-form');
        addOverlayBackground();
    }); 
})();

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
    const formHeading = document.createElement('h1');
    const nameContainer = document.createElement('div');
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');
    const buttonsContainer = document.createElement('div');
    const cancelButton = document.createElement('button');
    const submitButton = document.createElement('button');

    formHeading.textContent = 'Add Section';
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
    formHeading.classList.add('form-heading');
    nameContainer.classList.add('name-container');
    nameLabel.classList.add('name-label');
    nameInput.classList.add('name-input');
    buttonsContainer.classList.add('buttons-container');
    cancelButton.classList.add('cancel-button');
    submitButton.classList.add('submit-button');

    sectionForm.appendChild(formHeading);
    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);
    sectionForm.appendChild(nameContainer);
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(submitButton);
    sectionForm.appendChild(buttonsContainer);

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

    if (!nameInput.checkValidity()) {
        showErrorMessage('.name-container', 'Name must not be empty!');
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

    deleteHeading.textContent = 'Delete Section?';
    deletePara.textContent = 'Doing so will permanently delete the sections and all of its todos';
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