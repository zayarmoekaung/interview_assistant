import { Model } from "@/types/model.type";
import { AnswerEvaluation } from "@/types/answerEvaluation.type";
import { makePostRequest } from "@/helpers/axios/request.helper";
import { decodeJsonFromMarkdown } from "@/helpers/json.helper";
export async function getAnswerEvaluation(
    model: Model,
    question: string,
    answer: string
): Promise<Omit<AnswerEvaluation, 'questionId' | 'answerId' | 'questionText' | 'answerText'>> {
    const payload = {
        model: model,
        question: question,
        answer: answer
    };
    const response = await makePostRequest('/api/interview/evaluate', payload);
    const decoded = decodeJsonFromMarkdown(response.response);
    console.log(decoded);
    return decoded as AnswerEvaluation;
}
