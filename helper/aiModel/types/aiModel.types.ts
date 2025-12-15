import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
export interface AiModel {
    model: OpenAI | GoogleGenerativeAI;
    generateResponse(prompt: string, modelName: string): Promise<string>;
    getAvailableModels?(): Promise<string[]>;
}