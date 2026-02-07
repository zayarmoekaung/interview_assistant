import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnswerEvaluation } from "@/types/answerEvaluation.type";
import { AllStoreStates } from "./historyStore"; // Import AllStoreStates

interface EvaluationState {
    evaluations: AnswerEvaluation[];
    addEvaluation: (evaluation: AnswerEvaluation) => void;
    clearEvaluations: () => void;
    // New functions
    clearStore: () => void;
    restoreStore: (state: AllStoreStates) => void;
}

const initialState: Omit<EvaluationState, "addEvaluation" | "clearEvaluations" | "clearStore" | "restoreStore"> = {
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
            restoreStore: (state: AllStoreStates) => set({ evaluations: state.evaluations }),
        }),
        {
            name: "evaluation-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
