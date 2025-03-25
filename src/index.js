import "./css/style.css";
import "./css/sidebar.css";
import "./sidebar.js";
import { Todo, populateTodos } from "./todo.js";
import { addTodoForm } from "./add-todo.js";
import { showSections, showSectionPage } from "./section.js";


populateTodos();
showSections();
showSectionPage('1');