import { Model, ModelType } from "@/types/model.type";
import { encodeBase64 } from "@/helpers/base64.helper";
import { decodeJsonFromMarkdown } from "@/helpers/json.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";
import { makePostRequest } from "@/helpers/axios/request.helper";
import { InterviewNote } from "@/types/interviewNote.type";
import { InterviewQuestion } from "@/types/interviewQuestion.type";

export async function getInterviewQuestion(model: Model, interviewNote: InterviewNote): Promise<InterviewQuestion> {
    const noteContent = JSON.stringify(interviewNote);
    const encodedNote = model.type === ModelType.LOCAL ? sanitizeForLLM(noteContent) : encodeBase64(noteContent);

    const payload = {
        model: model,
        interviewNote: interviewNote,
    };

    const response = await makePostRequest('/api/interview/question', payload);
    const decoded = decodeJsonFromMarkdown(response.response);
    return decoded as InterviewQuestion;
}