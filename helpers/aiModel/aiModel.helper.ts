import { ModelType} from "@/types/model.type";
import { createAiModelObject,AiModel } from "@/factories/aiModel";


export function createAiModel(modelType: ModelType): AiModel {
    return createAiModelObject(modelType)
}
export function getAvailableModelsTypes(): ModelType[] {
    const availableModels: ModelType[] = [];
    if (process.env.OPENAI_API_KEY) {
        availableModels.push(ModelType.OPENAI);
    }
    if (process.env.GOOGLE_API_KEY) {
        availableModels.push(ModelType.GEMINI);
    }
    if (process.env.KOBOLD_API_URL) {
        availableModels.push(ModelType.LOCAL);
    }
    return availableModels;
}


