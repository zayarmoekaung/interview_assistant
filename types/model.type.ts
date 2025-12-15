import { z } from 'zod';

export enum ModelType {
    GEMINI = 'gemini',
    OPENAI = 'openai',
}
export const ModelTypeEnum = z.enum([
    ModelType.GEMINI, 
    ModelType.OPENAI
]);
export const ModelSchema = z.object({
    name: z.string(),
    type: z.enum(ModelType),
});
export type ModelTypeEnum = z.infer<typeof ModelTypeEnum>;
export type Model = z.infer<typeof ModelSchema>;