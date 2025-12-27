import { availableModels } from "@/utils/api/availableModels";
import { useModelStore } from "@/stores/useModelStore";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useMessageStore } from "@/stores/useMessageStore";
import { Status } from "@/helpers/message/types/message.type";

export async function getAvailabelModels(){
    const { addTask } = useLoadingStore.getState();
    const { setModels } = useModelStore.getState();
    const { addMessage } = useMessageStore.getState();
    const loading = addTask("Fetching Available Models");
    try {
        const models = await availableModels()
        setModels(models)
    } catch (error) {
        addMessage(Status.ERROR,'Error fetching available models',error instanceof Error ? error.message : String(error))
    }finally{
        loading.stop
    }
}
