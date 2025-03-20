import "./style.css";
import { Todo, addSectionForm } from "./todo.js";
import { addTodo, showSections } from "./dom.js";

addTodo();
showSections();
const grocery = new Todo("Get Grocery", "Buy beers", "A", "0");