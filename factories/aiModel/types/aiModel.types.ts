import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HealthCheckResponse } from '@/types/healthCheck.type';
export interface AiModel {
    model: OpenAI | GoogleGenerativeAI;
    generateResponse(prompt: string, modelName: string): Promise<string>;
    generateWithSystemAndUserPrompts(systemPrompt: string, userPrompt: string, modelName: string): Promise<string>;
    getIsAvailable?(): Promise<boolean>;
    getHealth?(modelName: string): Promise<HealthCheckResponse>;
    getAvailableModels?(): Promise<string[]>;
}