import "./style.css";
import { Todo } from "./todo.js";
import { addTodo } from "./add-todo.js";
import { showSections } from "./section.js";

addTodo();
showSections();
const grocery = new Todo("Get Grocery", "Buy beers", "A", "0");