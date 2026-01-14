import {create} from "zustand"
import { Greeting } from "@/types/interviewResponse.type"
import { persist, createJSONStorage } from "zustand/middleware"

interface MockInterviewState {
    greeting: Greeting | null
    setGreeting: (greeting: Greeting) => void
}
export const useMockInterviewStore = create(
    persist<MockInterviewState>(
        (set)=>(
            {
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