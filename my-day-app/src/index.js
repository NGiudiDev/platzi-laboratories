import "./css/base.css";

import {
  clearTaskCompleted,
  firstLoad,
  inputValue,
  renderUI,
} from "./js/logic/ui";

export const clearCompleted = document.querySelector(".clear-completed");
export const todoListContainer = document.querySelector(".todo-list");
export const inputNewTodo = document.querySelector(".new-todo");
export const todoCount = document.querySelector(".todo-count");
export const filters = document.querySelector(".filters");
export const footer = document.querySelector(".footer");
export const main = document.querySelector(".main");

window.addEventListener("hashchange", renderUI, false);

clearCompleted.addEventListener("click", clearTaskCompleted);
inputNewTodo.addEventListener("keydown", handleInput);

function handleInput({ key }) {
  if (key === "Enter") {
    inputValue(inputNewTodo.value);
  }
}

window.addEventListener("load", firstLoad);
