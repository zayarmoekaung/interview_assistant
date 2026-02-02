import { Converse } from "../types/converse.type";
import { InterviewNote } from "@/types/interviewNote.type";
import { getTimeStamp } from "@/helpers/time.helper";
import { generateTTSAudio } from '@/services/generateTTSAudio.service';
import { playAudioFromBlob } from "@/helpers/audio/audio.helper";

export class AiConverseProvider implements Converse {
    id: number;
    note: InterviewNote | null;
    text: string ;
    isOutgoing: boolean;
    repliedTo?: number | undefined;
    timestamp?: number;
    audioBlob: Blob | null = null;
    constructor(id: number,note: InterviewNote, repliedTo?: number){
        this.id = id;
        this.isOutgoing = false;
        this.note = note;
        this.text = note.category === "Feedback" ? note.note : ""; 
        this.timestamp = getTimeStamp();
        this.repliedTo = repliedTo;
    }
    async playAudio(){
        console.log("Clicked");
        if (this.audioBlob) {
            await playAudioFromBlob(this.audioBlob);
            return
        }
        const audioBlob = await generateTTSAudio(this.text);
        if (audioBlob) {
            this.audioBlob = audioBlob
            await playAudioFromBlob(audioBlob);
        }
    }

    updateText(newText: string) {
        this.text = newText;
    }

}