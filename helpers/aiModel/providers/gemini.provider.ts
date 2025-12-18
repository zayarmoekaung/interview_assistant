import { AiModel } from "../types/aiModel.types";
import { GoogleGenerativeAI} from '@google/generative-ai';
import { makeGetRequest } from "../../axios/request.helper";

class GeminiModel implements AiModel {
    model: GoogleGenerativeAI;
    constructor() {
        this.model = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    }
    async generateResponse(prompt: string, modelName: string): Promise<string> {
        const geminiModel = this.model.getGenerativeModel({ model: modelName });
        const geminiResponse = await geminiModel.generateContent(prompt);
        return geminiResponse.response.text();
    }
    async generateWithSystemAndUserPrompts(systemPrompt: string, userPrompt: string, modelName: string): Promise<string> {
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
        return this.generateResponse(fullPrompt, modelName);
    }
    async getAvailableModels(): Promise<string[]> {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error('Google API key is not set');
        }
        try {
            const url = `${process.env.GOOGLE_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta2'}/models/?key=${apiKey}`;
            const response: any = await makeGetRequest(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response && response.models) {
                return response.models.map((model: any) => model.name);
            } else {
                throw new Error('Invalid response format from Google Generative AI API');
            }
        } catch (error) {
            console.error('Error fetching available Gemini models:', error);
            throw error;
        }
    }
}

export default GeminiModel;