import { InterviewNote } from "@/types/interviewNote.type";
export interface Converse {
    id: number;
    text: string;
    isOutgoing: boolean;
    note?: InterviewNote | null;
    repliedTo?: number;
    timestamp?: number;
    updateText?: (newText: string) => void; 
    playAudio?: () => void;
}