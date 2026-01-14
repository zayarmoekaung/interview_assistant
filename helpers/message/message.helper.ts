import { Message, Status } from "./types/message.type";
import { MessageProvider } from "./providers/message.provider";
import { useMessageStore } from "@/stores/useMessageStore";
import { createMonitoringProxy } from "@/proxies/proxyFactory";
export const createMessage = (status: Status ,title: string,message: string):Message => {
    const {addMessage,removeMessage, messages} = useMessageStore.getState();
    const newMessage = new MessageProvider(status,title,message,messages.length);
    const monitoredMessage = createMonitoringProxy(newMessage,(changeInfo)=>{
        removeMessage(newMessage.index);
    })
    monitoredMessage.startExpirationTimer();
    addMessage(monitoredMessage);
    return monitoredMessage;
}
