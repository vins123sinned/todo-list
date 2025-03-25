import { parseISO, isSameYear, format } from "date-fns"; 
import { showSectionPage } from "./section";

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
    if (elementName === '.section-dropdown') document.querySelector('.section-button').classList.remove('section-button-clicked');
}

export function showDropdown(containerName, dropdownName, dropdownFunction) {
    const container = document.querySelector(containerName);
    const dropdown = document.querySelector(dropdownName);

    if (!container.contains(dropdown)) {
        if (dropdownName === '.priority-dropdown') {
            container.appendChild(dropdownFunction());
        } else {
            container.appendChild(dropdownFunction());
        }
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

export function formatDate(dateValue) {
    const currentYear = (new Date()).toJSON().slice(0, 10);
    const parsedDate = parseISO(dateValue);

    if (isSameYear(currentYear, dateValue)) {
        return format(parsedDate, 'MMMM dd');
    } else {
        return format(parsedDate, 'MMMM dd yyyy');
    }
}

export function formatTime(timeValue) {
    // I don't think date-fns has this built in
    // so i'll do it myself
    const hours = timeValue.slice(0, 2);

    if (hours > 12) {
        const newHours = parseInt(hours) - 12;
        return `${newHours}${timeValue.slice(2)} PM`;
    } else {
        if (hours === '00') return `12${timeValue.slice(2)} AM`;
        return `${timeValue} AM`;
    }
}
