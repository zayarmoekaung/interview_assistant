import { availableModels } from "@/utils/api/availableModels";
import { useModelStore } from "@/stores/useModelStore";
import { createMessage } from "@/helpers/message/message.helper";
import { createTask } from "@/helpers/task/task.helper";
import { Status } from "@/helpers/message/types/message.type";

export async function getAvailabelModels(){
    const { setModels } = useModelStore.getState();
    const loading = createTask("Fetching Available Models");
    try {
        const models = await availableModels()
        setModels(models)
    } catch (error) {
        createMessage(Status.ERROR,'Error fetching available models',error instanceof Error ? error.message : String(error))
    }finally{
        loading.stop
    }
}
