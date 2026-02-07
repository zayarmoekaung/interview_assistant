import { create } from "zustand"
import { Converse } from "@/factories/converse/types/converse.type"

import { persist, createJSONStorage } from 'zustand/middleware'
import { createAiConverseObject } from '@/factories/converse/converse.factory'
import { AllStoreStates } from "./historyStore"; // Import AllStoreStates

interface ConversationState {
    conversation: Converse[];
    isLoading: boolean;
    addConverse: (converse: Converse) => void;
    removeConverse: (id: number) => void;
    clearConversation: () => void;
    updateConverseText: (id: number, newText: string) => void;
    toogleLoading: () => void;
    // New functions
    clearStore: () => void;
    restoreStore: (state: AllStoreStates) => void;
}

const initialState: Omit<ConversationState, "addConverse" | "removeConverse" | "clearConversation" | "updateConverseText" | "toogleLoading" | "clearStore" | "restoreStore"> = {
    conversation: [],
    isLoading: false,
};

export const ConversationStore = create(
    persist<ConversationState>(
        (set, get) => ({
            ...initialState, // Set initial state
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
                    conversation: state.conversation.map((c) => {
                        if (c.id === id) {
                            if (typeof c.updateText === 'function') {
                                c.updateText!(newText);
                                return c;
                            }
                            // Fallback to immutable update for plain objects
                            return { ...c, text: newText };
                        }
                        return c;
                    }),
                }));
            },
            toogleLoading:()=>{
               const  loading = get().isLoading;
               set(
                {
                    isLoading: !loading
                }
               )
            },
            // New clear and restore functions
            clearStore: () => set(initialState),
            restoreStore: (state: AllStoreStates) => set({ conversation: state.conversation}),
        }),
        {
            name: "conversation-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                // Restore class instances for AiConverseProvider where possible
                const revived = state.conversation.map((c: any) => {
                    // If object already has methods, keep as is
                    if (typeof c.playAudio === 'function' && typeof c.updateText === 'function') {
                        return c;
                    }
                    // If it looks like AI converse (has note) recreate instance
                    if (c && c.note && typeof c.id === 'number') {
                        const instance = createAiConverseObject(c.id, c.note);
                        // restore relevant fields
                        instance.text = c.text || '';
                        instance.timestamp = c.timestamp;
                        instance.repliedTo = c.repliedTo;
                        (instance as any).audioBlob = (c as any).audioBlob || null;
                        return instance as any;
                    }
                    return c;
                });
                // update the persisted state before it's applied to the store
                (state as any).conversation = revived;
            },
        }
    )
);
