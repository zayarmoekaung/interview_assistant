import { create } from 'zustand'
import { Message, Status } from '@/helpers/message/types/message.type'
import { createMessage } from '@/helpers/message/message.helper'

interface MessageState {
    messages: Message[],
    addMessage: (status: Status,title: string, message: string) => Message,
    removeMessage: (index: number) => void
}

export const useMessageStore = create<MessageState>((set, get) => ({
    messages: [],
    addMessage: (status,title, message) => {
        const messages = get().messages
        const newMessage = createMessage(status,title, message, messages.length)
        const updatedMessages = [...messages, newMessage]
        set({
                messages: updatedMessages
            })
        return newMessage
    },
    removeMessage: (index) => {
        const messages = get().messages.filter((message: Message)=> message.index !== index)
        set({
            messages
        })
    },
}))