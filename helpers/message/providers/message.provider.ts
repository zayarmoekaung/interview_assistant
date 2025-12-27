import { Message, Status } from "../types/message.type";
import { useMessageStore } from "@/stores/useMessageStore";
export class MessageProvider implements Message {
    status: Status;
    title: string;
    message: string;
    index: number;
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor(status: Status,title: string, message: string, index: number) {
        this.status = status
        this.title = title;
        this.message = message;
        this.index = index;
        this.timeoutId = setTimeout(() => {
            this.close(this.index);
        }, 10_000);
    }
    close(index: number) {
        const { removeMessage } = useMessageStore.getState()
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        removeMessage(index);
    }
}