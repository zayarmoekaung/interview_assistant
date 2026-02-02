import z from "zod";

export const AnswerEvaluationSchema = z.object({
    questionId: z.number(),
    answerId: z.number(),
    questionText: z.string(),
    answerText: z.string(),
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
