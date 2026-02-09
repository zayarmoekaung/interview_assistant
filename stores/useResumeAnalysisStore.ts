import {create} from "zustand";
import { ResumeMatchResponse } from "@/types/resumeMatchResponse.type";
import  { persist,createJSONStorage } from 'zustand/middleware'

export interface ResumeAnalysisData {
     analysisResult: ResumeMatchResponse | null;
}
interface ResumeAnalysisState extends ResumeAnalysisData{
  setAnalysisResult: ( result: ResumeMatchResponse | null) => void;
  clearAnalysisResult: () => void;
  // New functions
  clearStore: () => void;
  restoreStore: (state: ResumeAnalysisData) => void;
}

const initialState: ResumeAnalysisData = {
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
            restoreStore: (state: ResumeAnalysisData) => set({ analysisResult: state.analysisResult }),
        }),
        {
            name: 'resume-analysis-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
