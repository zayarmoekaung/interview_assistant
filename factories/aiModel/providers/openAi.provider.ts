import { AiModel } from "../types/aiModel.types";
import OpenAI from 'openai';
import { HealthCheckResponse } from "@/types/healthCheck.type";
import { healthCheckPrompt } from "@/prompts/health_check.prompt";
class OpenAIModel implements AiModel {
    model: OpenAI;
    constructor() {
        this.model = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async generateResponse(prompt: string, modelName: string): Promise<string> {
        return this.model.chat.completions.create({
            model: modelName,
            messages: [{ role: 'user', content: prompt }],
        }).then(completions => {
            return completions.choices[0].message?.content || '';
        });
    }
    async generateWithSystemAndUserPrompts(systemPrompt: string, userPrompt: string, modelName: string): Promise<string> {
        return this.model.chat.completions.create({
            model: modelName,
            messages: [{ role: 'user', content: userPrompt }, { role: 'system', content: systemPrompt }],
        }).then(completions => {
            return completions.choices[0].message?.content || '';
        });
    }
    async getAvailableModels(): Promise<string[]> {
        const models = await this.model.models.list();
        return models.data.map(model => model.id);
    }
    async getIsAvailable(): Promise<boolean> {
        return Promise.resolve(!!process.env.OPENAI_API_KEY);
    }
    async getHealth(modelName: string): Promise<HealthCheckResponse> {
        if (!this.model) {
            return { status: 'Unhealthy', message: 'Model is not initialized' };
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

export default OpenAIModel;