import { Converse } from "../types/converse.type";
import { InterviewNote } from "@/types/interviewNote.type";
import { getTimeStamp } from "@/helpers/time.helper";


export class AiConverseProvider implements Converse {
    id: number;
    note: InterviewNote | null;
    text: string ;
    isOutgoing: boolean;
    timestamp?: number | undefined;

    constructor(id: number,note: InterviewNote){
        this.id = id;
        this.isOutgoing = false;
        this.note = note;
        this.text = "";
        this.timestamp = getTimeStamp();
    }

}