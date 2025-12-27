import { Task } from "./types/task.type";
import { TaskProvider } from "./providers/task.provider";

export function createTask(name: string, index: number): Task {
    return new TaskProvider(name, index);
}