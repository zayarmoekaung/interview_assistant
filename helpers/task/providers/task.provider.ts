import { Task } from "../types/task.type";
import { useLoadingStore } from "@/stores/useLoadingStore";
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
        const removeTask = useLoadingStore.getState().removeTask;
        this.isLoading = false;
        removeTask(this.index);
    }
}