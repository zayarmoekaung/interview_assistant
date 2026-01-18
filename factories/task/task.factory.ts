import { Task } from "./types/task.type";
import { TaskProvider } from "./providers/task.provider";
export function createTaskObject(name: string,index: number): Task {
    const task = new TaskProvider(name, index);
    return task;
}