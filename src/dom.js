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
    formContainer.appendChild(prioritySelect())

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

    currentPriority.prepend(currentPriorityIcon);
    priorityContainer.appendChild(currentPriority);

    currentPriority.addEventListener('click', (event) => {
        const getOptionsContainer = document.querySelector('.options-container');
        if (!priorityContainer.contains(getOptionsContainer)) {
            priorityContainer.appendChild(priorityOptions());
        }
    });

    return priorityContainer;
}

function priorityOptions() {
    const options = ['urgent', 'important', 'low priority', 'none'];

    const optionsContainer = document.createElement('div')
    const priorityOptions = document.createElement('ul');

    optionsContainer.classList.add('options-container');
    priorityOptions.classList.add('priority-options');

    options.forEach((option) => {
        const list = document.createElement('li');
        list.classList.add('priority-option');
        list.textContent = option;

        priorityOptions.appendChild(list);
    });

    optionsContainer.appendChild(priorityOptions);
    return optionsContainer;
}

console.log(priorityOptions());