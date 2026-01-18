import { Message, Status } from "./types/message.type";
import { MessageProvider } from "./providers/message.provider";

export const createMessageObject = (status: Status ,title: string,message: string,index: number):Message => {
    const newMessage = new MessageProvider(status,title,message,index);
    return newMessage;
}
