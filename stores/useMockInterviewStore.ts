import {create} from "zustand"
import { Greeting } from "@/types/interviewResponse.type"
import { persist, createJSONStorage } from "zustand/middleware"

interface MockInterviewState {
    greeting: Greeting | null
    audioBlob: Blob | null
    conversationStarted: boolean
    setGreeting: (greeting: Greeting | null ) => void
    setConversationStarted: (started: boolean) => void
    setAudioBlob: (audioBlob: Blob) => void
}
export const useMockInterviewStore = create(
    persist<MockInterviewState>(
        (set)=>(
            {
                version: null,
                greeting: null,
                audioBlob: null,
                conversationStarted: false,
                setGreeting: (greeting)=> set({greeting}),
                setAudioBlob: (audioBlob)=>set({audioBlob}),
                setConversationStarted: (started) => set({ conversationStarted: started }),
            }
        ),
        {
            name: "mock-interview-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
);