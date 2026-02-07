import {create} from "zustand"
import { Greeting } from "@/types/interviewResponse.type"
import { persist, createJSONStorage } from "zustand/middleware"
import { AllStoreStates } from "./historyStore"; // Import AllStoreStates

interface MockInterviewState {
    greeting: Greeting | null
    audioBlob: Blob | null
    conversationStarted: boolean
    setGreeting: (greeting: Greeting | null ) => void
    setConversationStarted: (started: boolean) => void
    setAudioBlob: (audioBlob: Blob) => void
    // New functions
    clearStore: () => void;
    restoreStore: (state: AllStoreStates) => void;
}

const initialState: Omit<MockInterviewState, "setGreeting" | "setConversationStarted" | "setAudioBlob" | "clearStore" | "restoreStore"> = {
    greeting: null,
    audioBlob: null,
    conversationStarted: false,
};

export const useMockInterviewStore = create(
    persist<MockInterviewState>(
        (set)=>(
            {
                ...initialState, // Set initial state
                setGreeting: (greeting)=> set({greeting}),
                setAudioBlob: (audioBlob)=>set({audioBlob}),
                setConversationStarted: (started) => set({ conversationStarted: started }),
                // New clear and restore functions
                clearStore: () => set(initialState),
                restoreStore: (state: AllStoreStates) => set({ greeting: state.greeting, audioBlob: state.audioBlob, conversationStarted: state.conversationStarted }),
            }
        ),
        {
            name: "mock-interview-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
);
