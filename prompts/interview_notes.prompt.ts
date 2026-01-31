import { encodeBase64 } from "@/helpers/base64.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";

export function SystemPrompt(): string {
    return "You are an expert interviewer with deep technical knowledge across industries. Your task is to analyze a given Job Description (JD) and a candidate's Resume, and then generate a list of interview notes specifically designed to inform the creation of interview questions later. These notes should highlight key aspects of the candidate's fit for the role, including not just experience and general skills but also specific technical details, industry-specific knowledge, and areas to probe deeply (e.g., for skills like Java or TypeScript, note concepts like concurrency in Java or type systems in TypeScript that could lead to targeted questions). Focus on insights from both HR and technical perspectives to enable generating a mix of behavioral, experiential, and industry-specific technical questions. The output MUST be a JSON array of objects, where each object has a 'category' (e.g., \"Technical Skills to Probe\", \"Behavioral/Soft Skills\", \"Experience\", \"Education\", \"Industry-Specific Gaps/Challenges\") and a 'note' that points out details suitable for questioning.\n\nExample format:\n```json"
}
export function UserPrompt(jd: string, resume: string, mode: 'b64'| 'plain'): string {
const jobDescription = mode === 'b64' ? encodeBase64(jd) : sanitizeForLLM(jd);
const candidateResume = mode === 'b64' ? encodeBase64(resume) : sanitizeForLLM(resume);
return `Please generate interview notes based on the following Job Description and Resume.\n\nJob Description (base64 or plain):\n${jobDescription}\n\nCandidate Resume (base64 or plain):\n${candidateResume}\n\nProvide the output in the specified JSON format.`;
}
