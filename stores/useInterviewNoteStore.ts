import { create } from 'zustand'
import { InterviewNote } from '@/types/interviewNote.type'

interface InterviewNoteState {
    interviewNotes: InterviewNote[],
    addInterviewNote: (note: InterviewNote) => void,
    removeInterviewNote: (index: number) => void,
    setInterviewNotes: (notes: InterviewNote[]) => void,
}

export const useInterviewNoteStore = create<InterviewNoteState>((set, get) => ({
    interviewNotes: [],
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
}))
