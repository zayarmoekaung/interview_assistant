import { AiModel } from "../types/aiModel.types";
import OpenAI from 'openai';
import { healthCheckPrompt } from "@/prompts/health_check.prompt";
import { HealthCheckResponse } from "@/types/healthCheck.type";

class KoboldModel implements AiModel {
    model: OpenAI;
    constructor() {
        const apiUrl = process.env.KOBOLD_API_URL || 'http://localhost:5001/v1';
        this.model = new OpenAI({
            apiKey:'',
            baseURL: apiUrl,
        });
    }
    async generateResponse(prompt: string, modelName: string): Promise<string> {
        const response = await this.model.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        return response.choices[0].message.content || '';
    }
    async generateWithSystemAndUserPrompts(systemPrompt: string, userPrompt: string, modelName: string): Promise<string> {
        const response = await this.model.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ]
        });
        return response.choices[0].message.content || '';
    }
    async getIsAvailable(): Promise<boolean> {
        return Promise.resolve(!!process.env.KOBOLD_API_URL);
    }
    async getHealth(modelName: string): Promise<HealthCheckResponse> {
        if (!process.env.KOBOLD_API_URL) {
            return { status: 'Unhealthy', message: 'Kobold API URL is not set' };
        }
        try {
            const response = await this.generateResponse(healthCheckPrompt, modelName);
            if (response.trim() === 'Healthy') {
                return { status: 'Healthy' };
            } else {
                return { status: 'Unhealthy', message: `Unexpected response: ${response}` };
            }
        } catch (error) {
            console.error('Error in health check:', error);
            return { status: 'Unhealthy', message: `Error during health check: ${error}` };
        }
    }
}
export default KoboldModel;