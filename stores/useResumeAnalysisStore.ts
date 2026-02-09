import {create} from "zustand";
import { ResumeMatchResponse } from "@/types/resumeMatchResponse.type";
import  { persist,createJSONStorage } from 'zustand/middleware'

export interface ResumeAnalysisData {
     analysisResult: ResumeMatchResponse | null;
}
interface ResumeAnalysisState extends ResumeAnalysisData{
  storeName: string; // Added
  setAnalysisResult: ( result: ResumeMatchResponse | null) => void;
  clearAnalysisResult: () => void;
  clearStore: () => void;
  restoreStore: (state: ResumeAnalysisData) => void;
  getSaveableState: () => ResumeAnalysisData; // Added
}

const initialState: ResumeAnalysisData = {
    analysisResult: null,
};

export const useResumeAnalysisStore = create(
    persist<ResumeAnalysisState>(
        (set, get) => ({
            ...initialState,
            storeName: "resumeAnalysisStore", // Added
            setAnalysisResult: (result: ResumeMatchResponse | null) => set({ analysisResult: result }),
            clearAnalysisResult: () => set({ analysisResult: null }),
            clearStore: () => set(initialState),
            restoreStore: (state: ResumeAnalysisData) => set({ analysisResult: state.analysisResult }),
            getSaveableState: () => ({
                analysisResult: get().analysisResult,
            }),
        }),
        {
            name: 'resume-analysis-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
