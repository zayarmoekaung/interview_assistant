import { Model } from "@/types/model.type";

export async function getAnswerEvaluation(
    model: Model,
    question: string,
    answer: string
): Promise<{ generalFeedback: string; detailedFeedback: string }> {
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
    
    // Assuming the backend response structure matches the desired output
    // You might need to adjust this based on the actual backend response.
    return {
        generalFeedback: data.response.generalFeedback || "No general feedback from API.",
        detailedFeedback: data.response.detailedFeedback || "No detailed feedback from API."
    };
}
