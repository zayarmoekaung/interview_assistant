import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnswerEvaluation } from "@/types/answerEvaluation.type";

export interface EvaluationData {
    evaluations: AnswerEvaluation[];
}
interface EvaluationState extends EvaluationData{
    
    addEvaluation: (evaluation: AnswerEvaluation) => void;
    clearEvaluations: () => void;
    // New functions
    clearStore: () => void;
    restoreStore: (state: EvaluationData) => void;
}

const initialState: EvaluationData = {
    evaluations: [],
};

export const useEvaluationStore = create(
    persist<EvaluationState>(
        (set, get) => ({
            ...initialState, // Set initial state
            addEvaluation: (evaluation: AnswerEvaluation) => {
                const evaluations = get().evaluations;
                const newEvaluations = [...evaluations, evaluation];
                set({ evaluations: newEvaluations });
            },
            clearEvaluations: () => set({ evaluations: [] }),
            // New clear and restore functions
            clearStore: () => set(initialState),
            restoreStore: (state: EvaluationData) => set({ evaluations: state.evaluations }),
        }),
        {
            name: "evaluation-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
