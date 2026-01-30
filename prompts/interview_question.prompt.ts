import { encodeBase64 } from "@/helpers/base64.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";
import { InterviewNote } from "@/types/interviewNote.type";

export function SystemPrompt(): string {
    return "You are an expert HR interviewer. Your task is to take an interview note and generate a relevant interview question along with 2-3 probing questions. The output MUST be a JSON object in the following format:\n\n```json\n{\n  \"question\": \"Can you walk me through a project where you used TensorFlow to build a predictive model? What challenges did you face in data preprocessing?\",\n  \"probes\": [\"How did you evaluate the model's performance?\"; \"What optimizations did you apply to improve accuracy?\"]\n}\n```\n\nDo not include any conversational text, just the JSON output. The main question should be open-ended and encourage the candidate to elaborate, while the probes should dig deeper into specific aspects mentioned in the note or implied by the skill/experience.\n";
}

export function UserPrompt(interviewNote: InterviewNote, mode: 'b64'| 'plain'): string {
    const noteContent = JSON.stringify(interviewNote);
    const encodedNote = mode === 'b64' ? encodeBase64(noteContent) : sanitizeForLLM(noteContent);

    return `Please generate an interview question and probing questions based on the following interview note:\n\nInterview Note (base64 or plain):\n${encodedNote}\n\nProvide the output in the specified JSON format.`;
}
