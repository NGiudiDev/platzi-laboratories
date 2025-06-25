//? html elements
import { filters, inputNewTodo, todoCount, todoListContainer } from "../../";

//? js
import { getterLocalStorage, setterLocalStorage } from "./localStorage";
import { addTask, verifyTasksList } from "./features";
import { template } from "../template/taskTemplate";

//? model
import { taskPlanner } from "../models/tasksModel";

export const clearTaskCompleted = () => {
  taskPlanner.clearTaskCompleted();
  setterLocalStorage();
  renderUI();
};

export function editingMode({ target: { offsetParent: liContainer } }) {
  const { lastChild: input } = liContainer;

  //? add the class to the container to enter edit mode
  liContainer.classList.toggle("editing");
  input.focus();

  //? store the values of the ID and the default value of the input
  const initialValue = this.innerText;

  input.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") {
      const updatedTask = input.value.trim();

      taskPlanner.updateTask(liContainer.dataset.id, updatedTask);
      setterLocalStorage();
      renderUI();
    } else if (key === "Escape") {
      input.value = initialValue;
      liContainer.classList.remove("editing");
    }
  });
}

//? the logic used for the first load of the application
export const firstLoad = () => {
  const tasks = getterLocalStorage();

  if (!tasks || !tasks.length) {
    setterLocalStorage();
    verifyTasksList();
  } else {
    tasks.forEach((task) => taskPlanner.addTask(task));
    verifyTasksList();
    renderUI();
  }

  removeEventListener("load", firstLoad);
};

export const getTaskFilterd = () => {
  const { hash } = window.location;

  const all = filters.children[0].lastElementChild.classList;
  const pending = filters.children[1].lastElementChild.classList;
  const completed = filters.children[2].lastElementChild.classList;

  switch (hash) {
    case "":
    case "#/":
    case "#/all":
      all.add("selected");
      pending.remove("selected");
      completed.remove("selected");
      break;

    case "#/pending":
      all.remove("selected");
      pending.add("selected");
      completed.remove("selected");
      break;

    case "#/completed":
      all.remove("selected");
      pending.remove("selected");
      completed.add("selected");
      break;

    default:
      all.add("selected");
      pending.remove("selected");
      completed.remove("selected");
  }
};

export const itemLeft = () => {
  const tasks = taskPlanner.getPendingTasks();

  let item = "item";

  if (tasks.length > 1) {
    item += "s";
  }

  todoCount.innerHTML = `<strong>${tasks.length}</strong> ${item} left`;
};

export const inputValue = (text) => {
  text.trim().toLowerCase();

  if (text !== "") {
    addTask(text);
  }

  //? clear the input value
  inputNewTodo.value = "";
};

export const renderUI = () => {
  todoListContainer.innerHTML = "";

  verifyTasksList();
  getTaskFilterd();

  if (location.hash.startsWith("#/pending")) {
    const result = taskPlanner.getPendingTasks();
    todoListContainer.append(...template(result));
  } else if (location.hash.startsWith("#/completed")) {
    const result = taskPlanner.getCompletedTasks();
    todoListContainer.append(...template(result));
  } else {
    const result = taskPlanner.getTasks();
    todoListContainer.append(...template(result));
  }

  itemLeft();
};

export const taskCheckbox = (htmlElement) => {
  const liContainer = htmlElement.target.offsetParent;

  todoListContainer.classList.toggle("completed");
  taskPlanner.toggleCompleted(liContainer.dataset.id);

  verifyTasksList();
  setterLocalStorage();
  renderUI();
};
