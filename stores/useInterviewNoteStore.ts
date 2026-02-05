import { create } from 'zustand'
import { InterviewNote } from '@/types/interviewNote.type'
import { AllStoreStates } from './historyStore'; // Import AllStoreStates

interface InterviewNoteState {
    interviewNotes: InterviewNote[],
    currentNoteIndex:number,
    addInterviewNote: (note: InterviewNote) => void,
    removeInterviewNote: (index: number) => void,
    setInterviewNotes: (notes: InterviewNote[]) => void,
    setCurrentNoteIndex: (currentNoteIndex: number)=> void
    // New functions
    clearStore: () => void;
    restoreStore: (state: AllStoreStates) => void;
}

const initialState: Omit<InterviewNoteState, "addInterviewNote" | "removeInterviewNote" | "setInterviewNotes" | "setCurrentNoteIndex" | "clearStore" | "restoreStore"> = {
    interviewNotes: [],
    currentNoteIndex: 0,
};

export const useInterviewNoteStore = create<InterviewNoteState>((set, get) => ({
    ...initialState, // Set initial state
    addInterviewNote: (note) => {
        const notes = get().interviewNotes
        const updatedNotes = [...notes, note]
        set({
            interviewNotes: updatedNotes
        })
    },
    removeInterviewNote: (index) => {
        const notes = get().interviewNotes.filter((_note, i) => i !== index)
        set({
            interviewNotes: notes
        })
    },
    setInterviewNotes: (notes) => {
        set({
            interviewNotes: notes
        })
    },
    setCurrentNoteIndex(currentNoteIndex) {
        set({
            currentNoteIndex
        })
    },
    // New clear and restore functions
    clearStore: () => set(initialState),
    restoreStore: (state: AllStoreStates) => set({ interviewNotes: state.interviewNotes, currentNoteIndex: state.currentNoteIndex }),
}))
