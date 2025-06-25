//? model
import { taskPlanner } from "../models/tasksModel";

export const getterLocalStorage = () => {
  return JSON.parse(localStorage.getItem("mydayapp-js"));
};

export const setterLocalStorage = () => {
  const tasks = taskPlanner.getTasks();
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
};
