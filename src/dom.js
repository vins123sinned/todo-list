export function addOverlay(elementName) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.addEventListener('click', () => {
        removeElement(elementName);
    });

    document.body.appendChild(overlay);
}

export function addOverlayBackground() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay-background');
}

export function removeElement(elementName) {
    const element = document.querySelector(elementName);
    const overlay = document.querySelector('.overlay');

    element.remove();
    if (overlay) overlay.remove();
}

export function showDropdown(containerName, dropdownName, dropdownFunction) {
    const container = document.querySelector(containerName);
    const dropdown = document.querySelector(dropdownName);

    if (!container.contains(dropdown)) {
        container.appendChild(dropdownFunction());
        addOverlay(dropdownName);
    }
}

export function showErrorMessage(elementName, message) {
    const error = document.querySelector('.error-message');
    
    if (error) {
        if (`.${error.parentNode.className}` === elementName) {
            // update error message text if it already exists
            error.textContent = message;
        }
    } else {
        const errorMessage = document.createElement('p');
        const element = document.querySelector(elementName);

        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;

        element.appendChild(errorMessage);
    }
}

export function getCurrentDate() {
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