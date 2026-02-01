import { Converse } from "./types/converse.type";
import { InterviewNote } from "@/types/interviewNote.type";
import { AiConverseProvider } from "./providers/AiConverse.provider";
import { UserConverseProvider } from "./providers/UserConverse.provider";

export const createAiConverseObject = (id: number, note: InterviewNote):Converse => {
    const newConverse = new AiConverseProvider(id,note);
    return newConverse;
}
export const createUserConverseObject = (id: number, text: string, repliedTo: number):Converse => {
    const newConverse = new UserConverseProvider(id,text,repliedTo);
    return newConverse;
}