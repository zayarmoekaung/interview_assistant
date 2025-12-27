import { z } from "zod";

export const FieldMatchSchema = z.object({
  field: z.string().min(1),
  match_percentage: z
    .number()
    .min(0)
    .max(100),
  feedback: z.string().min(1),
  matched_keywords: z.array(z.string()),
  missing_keywords: z.array(z.string()),
  unused_keywords: z.array(z.string()),
});
export const ResumeMatchResponseSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  overall_match_percentage: z
    .number()
    .min(0)
    .max(100),
  field_matches: z.array(FieldMatchSchema),
  action_items: z.array(z.string()),
  general_feedback: z.string().min(1),
});

export type ResumeMatchResponse = z.infer<
  typeof ResumeMatchResponseSchema
>;

export type FieldMatch = z.infer<
  typeof FieldMatchSchema
>;
