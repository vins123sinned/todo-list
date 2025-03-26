import { addSidebarOverlay } from "./dom";
import { sidebarAddTodoForm } from "./add-todo";
import { todos } from "./todo";
import { isYesterday, isSameMonth, isSameYear } from "date-fns";
import { getCurrentDate } from "./dom";
import { sidebarOptionPage } from "./section-page";

(function addOptionListener() {
    const addOption = document.querySelector('.add-task-option');

    addOption.addEventListener('click', () => {
        sidebarAddTodoForm();
        addSidebarOverlay();
    });
})();

(function todayListener() {
    const todayOption = document.querySelector('.today-option');

    todayOption.addEventListener('click', () => {
        const filteredTodos = todos.filter((todo) => {
            // if no date but time, consider it today
            if (!todo.date && todo.time) return true;

            // use isYesterday since date is one day off
            return isYesterday(todo.date);
        });

        sidebarOptionPage(filteredTodos, 'Today');
    })
})();

(function upcomingListener() {
    const upcomingOption = document.querySelector('.upcoming-option');

    upcomingOption.addEventListener('click', () => {
        const currentDate = getCurrentDate();

        const filteredTodos = todos.filter((todo) => {
            return isSameMonth(currentDate, todo.date);
        });
        
        sidebarOptionPage(filteredTodos, 'Upcoming');
    })
})();

(function yearListener() {
    const yearOption = document.querySelector('.year-option');

    yearOption.addEventListener('click', () => {
        const currentDate = getCurrentDate();

        const filteredTodos = todos.filter((todo) => {
            return isSameYear(currentDate, todo.date);
        });
        
        sidebarOptionPage(filteredTodos, 'This Year');
    });
})();

(function allListener() {
    const allOption = document.querySelector('.all-option');

    allOption.addEventListener('click', () => {
        sidebarOptionPage(todos, 'All Todos');
    });
})();