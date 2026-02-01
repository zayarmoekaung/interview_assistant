import { Converse } from "../types/converse.type";
import { getTimeStamp } from "@/helpers/time.helper";

export class UserConverseProvider implements Converse {
    id: number;
    text: string ;
    repliedTo?: number;
    isOutgoing: boolean;
    timestamp?: number | undefined;
    constructor(id: number,text: string, repliedTo: number){
        this.id = id;
        this.isOutgoing = true;
        this.text = text;
        this.repliedTo = repliedTo;
        this.timestamp = getTimeStamp();
    }

    updateText(newText: string) {
        this.text = newText;
    }

}