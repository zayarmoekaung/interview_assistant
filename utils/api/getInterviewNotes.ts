import { Model, ModelType } from "@/types/model.type";
import { encodeBase64 } from "@/helpers/base64.helper";
import { decodeJsonFromMarkdown } from "@/helpers/json.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";
import { makePostRequest } from "@/helpers/axios/request.helper";
import { InterviewNotesResponse } from "@/types/interviewNotesResponse.type";

export async function getInterviewNotes(model: Model, jd: string, resume: string): Promise<InterviewNotesResponse> {
    const encodedJd = model.type === ModelType.LOCAL ? sanitizeForLLM(jd) : encodeBase64(jd);
    const encodedResume = model.type === ModelType.LOCAL ? sanitizeForLLM(resume) : encodeBase64(resume);

    const payload = {
        model: model,
        jobDescription: encodedJd,
        resume: encodedResume,
    };

    const response = await makePostRequest('/api/interview/notes', payload);
    const decoded = decodeJsonFromMarkdown(response.response);
    return decoded as InterviewNotesResponse;
}