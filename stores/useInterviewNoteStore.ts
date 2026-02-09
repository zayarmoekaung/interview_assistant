import { create } from 'zustand'
import { InterviewNote } from '@/types/interviewNote.type'

export interface InterviewNoteData {
     interviewNotes: InterviewNote[],
    currentNoteIndex:number,
}
interface InterviewNoteState  extends InterviewNoteData{
    addInterviewNote: (note: InterviewNote) => void,
    removeInterviewNote: (index: number) => void,
    setInterviewNotes: (notes: InterviewNote[]) => void,
    setCurrentNoteIndex: (currentNoteIndex: number)=> void
    clearStore: () => void;
    restoreStore: (state: InterviewNoteData) => void;
}

const initialState: InterviewNoteData = {
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
    restoreStore: (state: InterviewNoteData) => set({ interviewNotes: state.interviewNotes, currentNoteIndex: state.currentNoteIndex }),
}))
