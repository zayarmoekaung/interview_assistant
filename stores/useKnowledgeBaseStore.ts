import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export interface KnowledgeBaseData {
    jdText: string;
    resumeText: string;
}

interface KnowledgeBaseState extends KnowledgeBaseData{
    storeName: string;
    setJDText: (text: string) => void;
    setResumeText: (text: string) => void;
    clearStore: () => void;
    restoreStore: (state: KnowledgeBaseData) => void;
    getSaveableState: () => KnowledgeBaseData;
}

const initialState: KnowledgeBaseData = {
    jdText: "",
    resumeText: "",
};

export const useKnowledgeBaseStore = create(
    persist<KnowledgeBaseState>(
        (set, get) => ({
            ...initialState,
            storeName: "knowledgeBaseStore",
            setJDText: (text: string) => set({ jdText: text }),
            setResumeText: (text: string) => set({ resumeText: text }),
            clearStore: () => set(initialState),
            restoreStore: (state: KnowledgeBaseData) => set({ jdText: state.jdText, resumeText: state.resumeText }),
            getSaveableState: () => ({
                jdText: get().jdText,
                resumeText: get().resumeText,
            }),
        }),
        {
            name: 'jd-resume-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
