import z from "zod"

export const InterviewNoteSchema = z.object({
    question: z.string().min(5),
    probes: z.array(z.string())
})

export type InterviewNote = z.infer<typeof InterviewNoteSchema>;