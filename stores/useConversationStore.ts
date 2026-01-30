import { create } from "zustand"
import { Converse } from "@/factories/converse/types/converse.type"

import { persist, createJSONStorage } from 'zustand/middleware'

interface ConversationState {
    conversation : Converse[],
    addConverse: (converse: Converse) => void,
    removeConverse: (index: number) => void,
    clearConversation: () => void}
export const ConversationStore = create(
    persist<ConversationState>(
        (set,get) => ({
            conversation: [],
            addConverse: ( converse: Converse) => {
                const conversation = get().conversation;
                const newConversation = [...conversation,converse]
                set(
                    {
                        conversation: newConversation
                    }
                )
            },
            removeConverse: (index: number) => {
                const conversation = get().conversation.filter((converse: Converse)=>converse.id !== index)
                set({
                    conversation
                })
            },
            clearConversation: () => set({ conversation: [] })
        }),
        {
            name: "conversation-storage",
            storage: createJSONStorage(()=>localStorage)
        }
    )
)