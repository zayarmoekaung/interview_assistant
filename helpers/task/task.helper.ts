import { Task } from "./types/task.type";
import { TaskProvider } from "./providers/task.provider";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { createMonitoringProxy } from "@/proxies/proxyFactory";
export function createTask(name: string): Task {
    const { addTask,removeTask,tasks } = useLoadingStore.getState();
    const task = new TaskProvider(name, tasks.length);
    const monitoredTask = createMonitoringProxy(task, (changeInfo)=>{
            removeTask(task.index);
    },['isLoading'])
    addTask(monitoredTask);
    return monitoredTask;
}