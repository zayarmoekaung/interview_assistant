import {create} from "zustand";
import { ResumeMatchResponse } from "@/types/resumeMatchResponse.type";
import  { persist,createJSONStorage } from 'zustand/middleware'
import { AllStoreStates } from "./historyStore"; // Import AllStoreStates

interface ResumeAnalysisState {
  analysisResult: ResumeMatchResponse | null;
  setAnalysisResult: ( result: ResumeMatchResponse | null) => void;
  clearAnalysisResult: () => void;
  // New functions
  clearStore: () => void;
  restoreStore: (state: AllStoreStates) => void;
}

const initialState: Omit<ResumeAnalysisState, "setAnalysisResult" | "clearAnalysisResult" | "clearStore" | "restoreStore"> = {
    analysisResult: null,
};

export const useResumeAnalysisStore = create(
    persist<ResumeAnalysisState>(
        (set) => ({
            ...initialState, // Set initial state
            setAnalysisResult: (result: ResumeMatchResponse | null) => set({ analysisResult: result }),
            clearAnalysisResult: () => set({ analysisResult: null }),
            // New clear and restore functions
            clearStore: () => set(initialState),
            restoreStore: (state: AllStoreStates) => set({ analysisResult: state.analysisResult }),
        }),
        {
            name: 'resume-analysis-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
