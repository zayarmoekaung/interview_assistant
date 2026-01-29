import { z } from "zod";

export const EvaluationScoresSchema = z.object({
    relevance: z.number().int().min(0).max(10),
    depth: z.number().int().min(0).max(10),
    clarity: z.number().int().min(0).max(10),
    overall: z.number().int().min(0).max(10),
});

export const EvaluationResponseSchema = z.object({
    scores: EvaluationScoresSchema,
    remarks: z.string().min(1),
});

export type EvaluationScores = z.infer<typeof EvaluationScoresSchema>;
export type EvaluationResponse = z.infer<typeof EvaluationResponseSchema>;