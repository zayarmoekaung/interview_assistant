import { Task } from "../types/task.type";
export class TaskProvider implements Task {
    name: string;
    index: number;
    isLoading: boolean;

    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
        this.isLoading = true;
    }

    stop() {
        this.isLoading = false;
    }
}