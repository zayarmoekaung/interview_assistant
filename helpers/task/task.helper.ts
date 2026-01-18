import { createTaskObject, Task } from "@/factories/task";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { createMonitoringProxy } from "@/proxies/proxyFactory";
export function createTask(name: string): Task {
    const { addTask,removeTask,tasks } = useLoadingStore.getState();
    const task = createTaskObject(name, tasks.length);
    const monitoredTask = createMonitoringProxy(task, (changeInfo)=>{
            removeTask(task.index);
    },['isLoading'])
    addTask(monitoredTask);
    return monitoredTask;
}