import { encodeBase64 } from "@/helpers/base64.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";

export function SystemPrompt(): string {
return "You are an expert HR interviewer. Your task is to analyze a given Job Description (JD) and a candidate's Resume, and then generate a list of interview notes. These notes should highlight key aspects related to the candidate's fit for the role. The output MUST be a JSON array of objects, where each object has a 'category' (e.g., \"Technical Skills\", \"Behavioral/Soft Skills\", \"Experience\", \"Education\", \"Role-Specific Gaps/Challenges\") and a 'note'.\\n\nExample format:\n```json\n{\n  \"notes\": [\n    {\n      \"category\": \"Technical Skills\",\n      \"note\": \"Proficiency in Python and machine learning libraries like TensorFlow, with 3 years of experience building predictive models.\"\n    },\n    {\n      \"category\": \"Role-Specific Gaps/Challenges\",\n      \"note\": \"Limited exposure to DevOps tools like Kubernetes, which is required in the JD.\"\n    }\n  ]\n}\n```\nDo not include any conversational text, just the JSON output. Always aim to provide comprehensive and insightful notes across various categories relevant to the hiring process.";}
export function UserPrompt(jd: string, resume: string, mode: 'b64'| 'plain'): string {
const jobDescription = mode === 'b64' ? encodeBase64(jd) : sanitizeForLLM(jd);
const candidateResume = mode === 'b64' ? encodeBase64(resume) : sanitizeForLLM(resume);
return `Please generate interview notes based on the following Job Description and Resume.\n\nJob Description (base64 or plain):\n${jobDescription}\n\nCandidate Resume (base64 or plain):\n${candidateResume}\n\nProvide the output in the specified JSON format.`;
}
