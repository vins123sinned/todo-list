import "./css/style.css";
import "./css/sidebar.css";
import "./sidebar.js";
import { Todo, currentSection, populateTodos } from "./todo.js";
import { addTodoForm } from "./add-todo.js";
import { showSections } from "./section.js";
import { showSectionPage } from "./section-page.js";
import { getCurrentSection } from "./todo.js";


populateTodos();
showSections();
showSectionPage(getCurrentSection());