import { Message, Status } from "./types/message.type";
import { MessageProvider } from "./providers/message.provider";

export const createMessage = (status: Status ,title: string,message: string,index: number):Message => {
    return new MessageProvider(status,title,message,index);
}
