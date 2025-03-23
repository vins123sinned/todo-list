import "./style.css";
import { Todo, populateTodos } from "./todo.js";
import { addTodoForm } from "./add-todo.js";
import { showSections, showSectionPage } from "./section.js";


populateTodos();
showSections();
showSectionPage('default');
addTodoForm();