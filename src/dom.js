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
        removeDateDropdown();
    });

    dateSubmit.addEventListener('click', () => {
        dateSubmitClicked();
    });

    return dateDropdown;
}

function timeSelect() {
    const timeContainer = document.createElement('div');
    const timeButton = document.createElement('button');
    const timeIcon = document.createElement('span');

    timeButton.type = 'button';
    timeButton.textContent = 'Time';
    timeIcon.classList.add('material-symbols-outlined');
    timeIcon.textContent = 'schedule';

    timeButton.classList.add('current-time');
    timeIcon.classList.add('time-icon');

    timeButton.prepend(timeIcon);
    timeContainer.appendChild(timeButton);

    timeButton.addEventListener('click', () => {
        const getTimeDropdown = document.querySelector('.time-dropdown');
        if (!timeContainer.contains(getTimeDropdown)) {
            timeContainer.appendChild(timeDropdown());
            addOverlay('.time-dropdown');
        }
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
        removeTimeDropdown();
    });

    timeSubmit.addEventListener('click', () => {
        timeSubmitClicked();
    });

    return timeDropdown;
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
        if (document.querySelector('.error-message')) return;

        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
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

function removeTimeDropdown() {
    removeElement('.time-dropdown');
    removeOverlay();
}

function timeSubmitClicked() {
    const timeDropdown = document.querySelector('.time-dropdown');
    const timeInput = document.querySelector('.time-input');

    if (!timeInput.checkValidity()) {
        if (document.querySelector('.error-message')) return;

        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Time is invalid!';

        timeDropdown.appendChild(errorMessage);
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

    removeTimeDropdown();
}

(function addSectionListener() {
    const sectionAdd = document.querySelector('.section-add');
    sectionAdd.addEventListener('click', () => {
        document.body.appendChild(showSectionForm());
        addOverlay('.section-form');
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
            console.log('Delete functionality goes here!')
        });

        sectionsList.appendChild(list);
    });
}

function showSectionForm() {
    const sectionForm = document.createElement('form');
    const formHeading = document.createElement('h1');
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');
    const formCancel = document.createElement('button');
    const formSubmit = document.createElement('button');

    formHeading.textContent = 'Add Section';
    nameLabel.htmlFor = 'name';
    nameLabel.textContent = 'Name (Max 32 characters)';
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true;
    nameInput.maxLength = '32';
    formCancel.type = 'button';
    formCancel.textContent = 'Cancel';
    formSubmit.type = 'button';
    formSubmit.textContent = 'Add';

    sectionForm.classList.add('section-form');

    sectionForm.appendChild(formHeading);
    sectionForm.appendChild(nameLabel);
    sectionForm.appendChild(nameInput);
    sectionForm.appendChild(formCancel);
    sectionForm.appendChild(formSubmit);

    formCancel.addEventListener('click', () => {
        removeSectionForm();
    });

    formSubmit.addEventListener('click', () => {
        //formSubmitClicked(); function here!
    })

    return sectionForm;
}

function removeSectionForm() {
    removeElement('.section-form');
    removeOverlay();
}