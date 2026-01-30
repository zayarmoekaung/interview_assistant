import { z } from "zod";

export const InterviewQuestionSchema = z.object({
    question: z.string().min(5),
    probes: z.array(z.string()),
});

export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema>;
