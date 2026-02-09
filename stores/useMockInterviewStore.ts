import {create} from "zustand"
import { Greeting } from "@/types/interviewResponse.type"
import { persist, createJSONStorage } from "zustand/middleware"

export interface MockInterviewData {
    greeting: Greeting | null
    audioBlob: Blob | null
    conversationStarted: boolean
}
interface MockInterviewState extends MockInterviewData{
    setGreeting: (greeting: Greeting | null ) => void
    setConversationStarted: (started: boolean) => void
    setAudioBlob: (audioBlob: Blob) => void
    clearStore: () => void;
    restoreStore: (state: MockInterviewData) => void;
}

const initialState: MockInterviewData = {
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
                restoreStore: (state: MockInterviewData) => set({ greeting: state.greeting, audioBlob: state.audioBlob, conversationStarted: state.conversationStarted }),
            }
        ),
        {
            name: "mock-interview-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
);
