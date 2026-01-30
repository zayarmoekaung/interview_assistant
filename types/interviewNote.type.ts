import z from "zod"

export const InterviewNoteSchema = z.object({
    category: z.string().min(5),
    note: z.string().min(5),

})

export type InterviewNote = z.infer<typeof InterviewNoteSchema>;