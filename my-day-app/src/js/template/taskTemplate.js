import { editingMode, taskCheckbox } from "../logic/ui";
import { deleteTask } from "../logic/features";

export const template = (taskList) => {
  return taskList.map((taskView) => {
    const { id, title, completed } = taskView;

    //? li which will contain all the others html elements
    const li = document.createElement("li");
    li.dataset.id = id;

    if (completed) {
      li.classList.add("completed");
    }

    //? div which contains the checkbox, label, and delete button
    const div = document.createElement("div");
    div.classList.add("view");

    //? checkbox
    const checkBox = document.createElement("input");
    checkBox.classList.add("toggle");
    checkBox.checked = completed;
    checkBox.type = "checkbox";

    checkBox.addEventListener("click", taskCheckbox);

    //? label
    const label = document.createElement("label");
    label.innerText = title;
    label.addEventListener("dblclick", editingMode);

    //? delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("destroy");
    deleteButton.addEventListener("click", deleteTask);

    //? edit input
    const editInput = document.createElement("input");
    editInput.value = title;
    editInput.classList.add("edit");

    div.append(checkBox, label, deleteButton);
    li.append(div, editInput);

    return li;
  });
};
