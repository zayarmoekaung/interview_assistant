import { create } from "zustand"
import { Converse } from "@/factories/converse/types/converse.type"

import { persist, createJSONStorage } from 'zustand/middleware'

interface ConversationState {
    conversation: Converse[];
    addConverse: (converse: Converse) => void;
    removeConverse: (id: number) => void;
    clearConversation: () => void;
    updateConverseText: (id: number, newText: string) => void;
}

export const ConversationStore = create(
    persist<ConversationState>(
        (set, get) => ({
            conversation: [],
            addConverse: (converse: Converse) => {
                const conversation = get().conversation;
                const newConversation = [...conversation, converse];
                set({
                    conversation: newConversation,
                });
            },
            removeConverse: (id: number) => {
                const conversation = get().conversation.filter((converse: Converse) => converse.id !== id);
                set({
                    conversation,
                });
            },
            clearConversation: () => set({ conversation: [] }),
            updateConverseText: (id: number, newText: string) => {
                set((state) => ({
                    conversation: state.conversation.map((c) =>
                        c.id === id ? { ...c, text: newText } : c
                    ),
                }));
            },
        }),
        {
            name: "conversation-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);