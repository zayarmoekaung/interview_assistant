import { Converse } from "./types/converse.type";
import { InterviewNote } from "@/types/interviewNote.type";
import { AiConverseProvider } from "./providers/AiConverse.provider";

export const createAiConverseObject = (id: number, note: InterviewNote):Converse => {
    const newConverse = new AiConverseProvider(id,note);
    return newConverse;
}