import { ModelType} from "@/types/model.type";
import { AiModel } from "./types/aiModel.types";
import OpenAIModel from "./providers/openAi.provider";
import GeminiModel from "./providers/gemini.provider";

export function createAiModel(modelType: ModelType): AiModel {
    if (modelType === ModelType.OPENAI) {
        return new OpenAIModel();
    } else if (modelType === ModelType.GEMINI) {
        return new GeminiModel();
    } else {
        throw new Error('Unsupported model type');
    }
}


