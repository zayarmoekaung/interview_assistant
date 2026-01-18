import { ModelType} from "@/types/model.type";
import { AiModel } from "./types/aiModel.types";
import OpenAIModel from "./providers/openAi.provider";
import GeminiModel from "./providers/gemini.provider";
import KoboldModel from "./providers/kobold.provider";

export function createAiModelObject(modelType: ModelType): AiModel {
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



