import { AiModel } from "../types/aiModel.types";
import OpenAI from 'openai';

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
}

export default OpenAIModel;