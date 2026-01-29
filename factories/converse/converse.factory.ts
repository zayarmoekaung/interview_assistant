import { Converse } from "./types/converse.type";
import { ConverseProvider } from "./providers/converse.provider";
export const createConverseObject = (id: number, isOutgoing: boolean):Converse => {
    const newConverse = new ConverseProvider(id,isOutgoing);
    return newConverse;
}