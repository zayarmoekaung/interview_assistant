import {create} from "zustand"
import { Greeting } from "@/types/interviewResponse.type"
import { persist, createJSONStorage } from "zustand/middleware"

interface MockInterviewState {
    greeting: Greeting | null
    setGreeting: (greeting: Greeting | null ) => void
}
export const useMockInterviewStore = create(
    persist<MockInterviewState>(
        (set)=>(
            {
                version: null,
                greeting: null,
                setGreeting: (greeting)=> set({greeting})
            }
        ),
        {
            name: "mock-interview-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
);