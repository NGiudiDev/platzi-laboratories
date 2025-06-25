//? model
import { taskPlanner } from "../models/tasksModel";

export const idGenerator = () => {
  const lastId = taskPlanner.getLastTaskId();
  return lastId + 1;
};
