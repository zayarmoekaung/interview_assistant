import { z } from "zod";

export const InterviewNoteItemSchema = z.object({
    category: z.string(),
    note: z.string(),
});

export const InterviewNotesResponseSchema = z.object({
    notes: z.array(InterviewNoteItemSchema),
});

export type InterviewNoteItem = z.infer<typeof InterviewNoteItemSchema>;
export type InterviewNotesResponse = z.infer<typeof InterviewNotesResponseSchema>;