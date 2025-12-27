import {create} from "zustand";
import { Task } from "@/helpers/task/types/task.type";
import { createTask } from "@/helpers/task/task.helper";

interface LoadingState {
  tasks: Task[];
  addTask: (name: string) => Task;
  removeTask: (index: number) => void;
  isLoading: boolean;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  tasks: [],
  isLoading: false,
  addTask: (name: string) => {
    const tasks = get().tasks;
    const newTask = createTask(name, tasks.length);
    const updatedTasks = [...tasks, newTask];
    set({
      tasks: updatedTasks,
      isLoading: updatedTasks.length > 0,
    });
    return newTask;
  },
  removeTask: (index: number) => {
    const tasks = get().tasks.filter((task: Task) => task.index !== index);
    set({ tasks, isLoading: tasks.length > 0 });
  },
}));