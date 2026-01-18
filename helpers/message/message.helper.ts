import { useMessageStore } from "@/stores/useMessageStore";
import { createMessageObject,Message,Status } from "@/factories/message";
import { createMonitoringProxy } from "@/proxies/proxyFactory";
export const createMessage = (status: Status ,title: string,message: string):Message => {
    const {addMessage,removeMessage, messages} = useMessageStore.getState();
    const newMessage = createMessageObject(status,title,message,messages.length);
    const monitoredMessage = createMonitoringProxy(newMessage,(changeInfo)=>{
        removeMessage(newMessage.index);
    },['expired'])
    monitoredMessage.startExpirationTimer();
    addMessage(monitoredMessage);
    return monitoredMessage;
}
