import {create} from "zustand";
import { ResumeMatchResponse } from "@/types/resumeMatchResponse.type";
import  { persist,createJSONStorage } from 'zustand/middleware'

interface ResumeAnalysisState {
  analysisResult: ResumeMatchResponse | null;
  setAnalysisResult: ( result: ResumeMatchResponse | null) => void;
  clearAnalysisResult: () => void;
}
export const useResumeAnalysisStore = create(
    persist<ResumeAnalysisState>(
        (set) => ({
            analysisResult: null,
            setAnalysisResult: (result: ResumeMatchResponse | null) => set({ analysisResult: result }),
            clearAnalysisResult: () => set({ analysisResult: null }),
        }),
        {
            name: 'resume-analysis-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
