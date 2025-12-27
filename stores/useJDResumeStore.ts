import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
interface JDResumeState {
    jdText: string;
    resumeText: string;
    setJDText: (text: string) => void;
    setResumeText: (text: string) => void;
}

export const useJDResumeStore = create(
    persist<JDResumeState>(
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