import { z } from 'zod';

export enum ModelType {
    GEMINI = 'gemini',
    OPENAI = 'openai',
    LOCAL  = 'local_llm',
}
export const ModelTypeEnum = z.enum([
    ModelType.GEMINI, 
    ModelType.OPENAI,
    ModelType.LOCAL
]);
export const ModelSchema = z.object({
    name: z.string(),
    type: z.enum(ModelType),
});
export type ModelTypeEnum = z.infer<typeof ModelTypeEnum>;
export type Model = z.infer<typeof ModelSchema>;