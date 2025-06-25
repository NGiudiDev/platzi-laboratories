//? html elements
import { clearCompleted, footer, main } from "../../";

//? js
import { setterLocalStorage } from "./localStorage";
import { idGenerator } from "./helpers";
import { renderUI } from "./ui";

//? model
import { taskPlanner } from "../models/tasksModel";

export const addTask = (text) => {
  let newTask = {
    id: idGenerator(),
    title: text,
    completed: false,
  };

  taskPlanner.addTask(newTask);

  setterLocalStorage();

  renderUI();
};

export const deleteTask = (htmlElement) => {
  const liContainer = htmlElement.target.offsetParent;

  taskPlanner.removeTask(liContainer.dataset.id);

  setterLocalStorage();
  renderUI();
};

export const verifyTasksList = () => {
  const tasks = taskPlanner.getTasks();

  if (!tasks || !tasks.length) {
    footer.classList.add("hidden");
    main.classList.add("hidden");
  } else {
    footer.classList.remove("hidden");
    main.classList.remove("hidden");

    const someCompleted = tasks.some((task) => task.completed === true);

    if (someCompleted) {
      clearCompleted.classList.remove("hidden");
    } else {
      clearCompleted.classList.add("hidden");
    }
  }
};
