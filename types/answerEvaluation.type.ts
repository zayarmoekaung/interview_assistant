import z from "zod";

export const AnswerEvaluationSchema = z.object({
    questionId: z.number().optional(),
    answerId: z.number().optional(),
    questionText: z.string().optional(),
    answerText: z.string().optional(),
    generalFeedback: z.string(),
    detailedFeedback: z.string(),
    scores: z.object({
        relevance: z.number(),
        depth: z.number(),
        clarity: z.number(),
        overall: z.number(),
    }).optional(),
    remarks: z.string().optional(),
});

export type AnswerEvaluation = z.infer<typeof AnswerEvaluationSchema>;
