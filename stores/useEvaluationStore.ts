import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnswerEvaluation } from "@/types/answerEvaluation.type";

export interface EvaluationData {
    evaluations: AnswerEvaluation[];
}
interface EvaluationState extends EvaluationData{
    storeName: string; // Added
    addEvaluation: (evaluation: AnswerEvaluation) => void;
    clearEvaluations: () => void;
    clearStore: () => void;
    restoreStore: (state: EvaluationData) => void;
    getSaveableState: () => EvaluationData; // Added
}

const initialState: EvaluationData = {
    evaluations: [],
};

export const useEvaluationStore = create(
    persist<EvaluationState>(
        (set, get) => ({
            ...initialState,
            storeName: "evaluationStore", // Added
            addEvaluation: (evaluation: AnswerEvaluation) => {
                const evaluations = get().evaluations;
                const newEvaluations = [...evaluations, evaluation];
                set({ evaluations: newEvaluations });
            },
            clearEvaluations: () => set({ evaluations: [] }),
            clearStore: () => set(initialState),
            restoreStore: (state: EvaluationData) => set({ evaluations: state.evaluations }),
            getSaveableState: () => ({
                evaluations: get().evaluations,
            }),
        }),
        {
            name: "evaluation-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
