import "./style.css";
import { Todo, todos } from "./todo.js";
import { addTodoForm } from "./add-todo.js";
import { showSections } from "./section.js";

addTodoForm();
showSections();
const grocery = new Todo("Get Grocery", "Buy beers", "A", "0");