import { create } from 'zustand'
import { Message, Status } from '@/helpers/message/types/message.type'
import { createMessage } from '@/helpers/message/message.helper'

interface MessageState {
    messages: Message[],
    addMessage: (message: Message) => void,
    removeMessage: (index: number) => void
}

export const useMessageStore = create<MessageState>((set, get) => ({
    messages: [],
    addMessage: (message) => {
        const messages = get().messages
        const updatedMessages = [...messages, message]
        set({
                messages: updatedMessages
            })
    },
    removeMessage: (index) => {
        const messages = get().messages.filter((message: Message)=> message.index !== index)
        set({
            messages
        })
    },
}))