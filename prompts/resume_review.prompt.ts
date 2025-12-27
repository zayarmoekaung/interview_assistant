import { personalityPrompt } from "./personalities/mafuyu.prompt";
export const SystemPrompt = (): string => {
  return `
    ${personalityPrompt} Analyze the provided resume against the job description (JD).
    Output in JSON format only, with these keys:
- name: Name of the candidate extract from resume.
- position: Job position from job description.
- overall_match_percentage: A number (0-100) representing the overall fit.
- field_matches: An array of objects, each with:
  - field: String (e.g., "Skills", "Experience", "Education", "Responsibilities").
  - match_percentage: Number (0-100).
  - feedback: String (detailed suggestions on strengths, gaps, and improvements).
  - matched_keywords: Array of Strings (keywords from JD that matched in resume).
  - missing_keywords: Array of Strings (important keywords from JD not found in resume).
  - unused_keywords: Array of Strings (keywords present in resume but not relevant to JD).
- action_items: An array of specific, actionable recommendations to improve the resume for this JD.
- general_feedback: String (overall advice on how to improve the resume for this JD Formatted in Markdown).

Base percentages on keyword overlap, skill relevance, experience alignment, and qualitative fit. Be objective, constructive, and specific. Use the resume's content to highlight examples.
`;
}

export const UserPrompt = (resume: string, jobDescription: string, mode: 'b64'| 'plain'): string => {
  return `
    Followings are ${mode == 'b64' ? 'Base64 encoded' : 'Plain Text'} Strings
    Resume:
    ${resume},
    Job Description:
    ${jobDescription}
  `;
}