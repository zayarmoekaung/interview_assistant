import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export interface KnowledgeBaseData {
    jdText: string;
    resumeText: string;
}

interface KnowledgeBaseState extends KnowledgeBaseData{
    setJDText: (text: string) => void;
    setResumeText: (text: string) => void;
    // New functions
    clearStore: () => void;
    restoreStore: (state: KnowledgeBaseData) => void;
}

const initialState: Omit<KnowledgeBaseState, "setJDText" | "setResumeText" | "clearStore" | "restoreStore"> = {
    jdText: "",
    resumeText: "",
};

export const useKnowledgeBaseStore = create(
    persist<KnowledgeBaseState>(
        (set) => ({
            ...initialState, // Set initial state
            setJDText: (text: string) => set({ jdText: text }),
            setResumeText: (text: string) => set({ resumeText: text }),
            // New clear and restore functions
            clearStore: () => set(initialState),
            restoreStore: (state: KnowledgeBaseData) => set({ jdText: state.jdText, resumeText: state.resumeText }),
        }),
        {
            name: 'jd-resume-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
