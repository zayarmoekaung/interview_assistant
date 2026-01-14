import { Message, Status } from "../types/message.type";
export class MessageProvider implements Message {
    status: Status;
    title: string;
    message: string;
    index: number;
    expired: boolean;
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor(status: Status, title: string, message: string, index: number) {
        this.status = status
        this.title = title;
        this.message = message;
        this.index = index;
        this.expired = false;
    }
    startExpirationTimer() {
        if (this.timeoutId) return;
        this.timeoutId = setTimeout(() => {
            this.close();
        }, 10000);
    }

    close() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.expired = true;
    }
}