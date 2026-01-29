import { Flex } from "@chakra-ui/react"
import Greeting from "../greeting"
import { useMockInterviewStore } from "@/stores/useMockInterviewStore"
import mafuyu from "@/assets/images/avatars/mafuyu.jpg"
import { generateGreeting } from "@/services/mockInterview.service"
export const InterviewConversationViewer = () => {
    const greeting = useMockInterviewStore((state)=> state.greeting);
    const handleGreetingAction = () => {
        generateGreeting();
    }
    return (
            <Flex h="full" w="full" align="center" justify="center" direction={"column"} padding={"5vw"}>
               {greeting &&
                <>
               <Greeting 
                   avatarSrc={mafuyu.src}
                   greetingText={greeting.message}
                   buttonText={"Start Mock Interview"}
                   onButtonClick={handleGreetingAction}
               />
               </>
               }
            </Flex>
    )
}