import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnswerEvaluation } from "@/types/answerEvaluation.type"; // New import

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
