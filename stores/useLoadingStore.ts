import {create} from "zustand";
import { Task } from "@/factories/task/types/task.type";

interface LoadingState {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  isLoading: boolean;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  tasks: [],
  isLoading: false,
  addTask: (task) => {
    const tasks = get().tasks;
    const updatedTasks = [...tasks, task];
    set({
      tasks: updatedTasks,
      isLoading: updatedTasks.length > 0,
    });
  },
  removeTask: (index: number) => {
    const tasks = get().tasks.filter((task: Task) => task.index !== index);
    set({ tasks, isLoading: tasks.length > 0 });
  },
}));