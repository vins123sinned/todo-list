import { addSidebarOverlay } from "./dom";
import { sidebarAddTodoForm } from "./add-todo";

(function addOptionListener() {
    const addOption = document.querySelector('.add-task-option');

    addOption.addEventListener('click', () => {
        sidebarAddTodoForm();
        addSidebarOverlay();
    });
})();