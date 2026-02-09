import {create} from "zustand"
import { Greeting } from "@/types/interviewResponse.type"
import { persist, createJSONStorage } from "zustand/middleware"

export interface MockInterviewData {
    greeting: Greeting | null
    audioBlob: Blob | null
    conversationStarted: boolean
}
interface MockInterviewState extends MockInterviewData{
    storeName: string; // Added
    setGreeting: (greeting: Greeting | null ) => void
    setConversationStarted: (started: boolean) => void
    setAudioBlob: (audioBlob: Blob) => void
    clearStore: () => void;
    restoreStore: (state: MockInterviewData) => void;
    getSaveableState: () => MockInterviewData; // Added
}

const initialState: MockInterviewData = {
    greeting: null,
    audioBlob: null,
    conversationStarted: false,
};

export const useMockInterviewStore = create(
    persist<MockInterviewState>(
        (set, get)=> (
            {
                ...initialState,
                storeName: "mockInterviewStore", // Added
                setGreeting: (greeting)=> set({greeting}),
                setAudioBlob: (audioBlob)=>set({audioBlob}),
                setConversationStarted: (started) => set({ conversationStarted: started }),
                clearStore: () => set(initialState),
                restoreStore: (state: MockInterviewData) => set({ greeting: state.greeting, audioBlob: state.audioBlob, conversationStarted: state.conversationStarted }),
                getSaveableState: () => ({
                    greeting: get().greeting,
                    audioBlob: get().audioBlob,
                    conversationStarted: get().conversationStarted,
                }),
            }
        ),
        {
            name: "mock-interview-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
);
