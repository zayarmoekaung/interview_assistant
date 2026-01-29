import { Converse } from "../types/converse.type";
import { getTimeStamp } from "@/helpers/time.helper";

export class ConverseProvider implements Converse {
    id: number;
    text: string ;
    isOutgoing: boolean;
    isLoading: boolean;
    timestamp?: number | undefined;

    constructor(id: number,isOutgoing: boolean){
        this.id = id;
        this.isOutgoing = isOutgoing;
        this.text = "";
        this.isLoading = true;
        this.timestamp = getTimeStamp();
    }

    makeConverse(text: string){
        this.text = text;
    }
}