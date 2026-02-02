import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AnswerEvaluation {
    questionId: number;
    answerId: number;
    questionText: string;
    answerText: string;
    generalFeedback: string;
    detailedFeedback: string; // Or a more structured type for detailed feedback
}

interface EvaluationState {
    evaluations: AnswerEvaluation[];
    addEvaluation: (evaluation: AnswerEvaluation) => void;
    clearEvaluations: () => void;
}

export const useEvaluationStore = create(
    persist<EvaluationState>(
        (set, get) => ({
            evaluations: [],
            addEvaluation: (evaluation: AnswerEvaluation) => {
                const evaluations = get().evaluations;
                const newEvaluations = [...evaluations, evaluation];
                set({ evaluations: newEvaluations });
            },
            clearEvaluations: () => set({ evaluations: [] }),
        }),
        {
            name: "evaluation-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
