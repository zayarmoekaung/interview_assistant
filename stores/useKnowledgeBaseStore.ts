import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
interface KnowledgeBaseState {
    jdText: string;
    resumeText: string;
    setJDText: (text: string) => void;
    setResumeText: (text: string) => void;
}

export const useKnowledgeBaseStore = create(
    persist<KnowledgeBaseState>(
        (set) => ({
            jdText: "",
            resumeText: "",
            setJDText: (text: string) => set({ jdText: text }),
            setResumeText: (text: string) => set({ resumeText: text }),
        }),
        {
            name: 'jd-resume-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);