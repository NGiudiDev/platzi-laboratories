const createTasks = () => {
  let tasksModel = [];

  return {
    addTask(newTask) {
      tasksModel.push(newTask);
      return "Todo agregado exitosamente", newTask;
    },
    removeTask(id) {
      tasksModel = tasksModel.filter((task) => task.id !== Number(id));
      return "Elemento Eliminado con exito", id;
    },
    getTasks() {
      return tasksModel;
    },
    getLastTaskId() {
      return tasksModel[tasksModel.length - 1]?.id || 0;
    },
    getPendingTasks() {
      return tasksModel.filter((task) => !task.completed);
    },
    getCompletedTasks() {
      return tasksModel.filter((task) => task.completed);
    },
    toggleCompleted(id) {
      let index;
      index = tasksModel.findIndex((task) => task.id === Number(id));
      tasksModel[index].completed = !tasksModel[index].completed;
    },
    updateTask(id, updates) {
      const index = tasksModel.findIndex((task) => task.id === Number(id));
      tasksModel[index] = { ...tasksModel[index], title: updates };
      return "Tarea actualizada con exito", updates, tasksModel;
    },
    clearTaskCompleted() {
      tasksModel = tasksModel.filter((task) => !task.completed);
    },
  };
};

export const taskPlanner = createTasks();
