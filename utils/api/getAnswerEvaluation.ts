import { Model } from "@/types/model.type";
import { AnswerEvaluation } from "@/types/answerEvaluation.type";

export async function getAnswerEvaluation(
    model: Model,
    question: string,
    answer: string
): Promise<Omit<AnswerEvaluation, 'questionId' | 'answerId' | 'questionText' | 'answerText'>> {
    const response = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer, model }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // The API returns a stringified JSON within a 'response' field.
    // We need to parse that inner string.
    const parsedResponse = JSON.parse(data.response);

    return {
        generalFeedback: parsedResponse.generalFeedback || "No general feedback from API.",
        detailedFeedback: parsedResponse.detailedFeedback || "No detailed feedback from API.",
        scores: parsedResponse.scores,
        remarks: parsedResponse.remarks,
    };
}
