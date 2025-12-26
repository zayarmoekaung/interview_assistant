import { ModelType} from "@/types/model.type";
import { AiModel } from "./types/aiModel.types";
import OpenAIModel from "./providers/openAi.provider";
import GeminiModel from "./providers/gemini.provider";
import KoboldModel from "./providers/kobold.provider";

export function createAiModel(modelType: ModelType): AiModel {
    if (modelType === ModelType.OPENAI) {
        return new OpenAIModel();
    } else if (modelType === ModelType.GEMINI) {
        return new GeminiModel();
    } else if (modelType === ModelType.LOCAL) {
        return new KoboldModel();
    } else {
        throw new Error('Unsupported model type');
    }
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


