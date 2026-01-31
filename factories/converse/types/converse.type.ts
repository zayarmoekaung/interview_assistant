import { InterviewNote } from "@/types/interviewNote.type";
export interface Converse {
    id: number;
    text: string;
    isOutgoing: boolean;
    note?: InterviewNote | null;
    timestamp?: number;
    updateText?: (newText: string) => void; 
}