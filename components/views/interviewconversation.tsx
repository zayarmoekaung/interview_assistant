import { Flex } from "@chakra-ui/react"
import Greeting from "../greeting"
import { useMockInterviewStore } from "@/stores/useMockInterviewStore"
import mafuyu from "@/assets/images/avatars/mafuyu.jpg"
import { ConversationBubbles } from "@/components/conversation/ConversationBubbles"
import { initializeConversation } from "@/helpers/conversation/conversation.helper"

export const InterviewConversationViewer = () => {
    const { greeting, conversationStarted, setConversationStarted } = useMockInterviewStore((state)=> state);
    const handleGreetingAction = async () => {
        const { setConversationStarted } = useMockInterviewStore.getState();
        try {
            await initializeConversation();
            setConversationStarted(true); 
        } catch (error) {
            console.error("Failed to initialize conversation:", error);
        }
    }

    return (
            <Flex h="full" w="full" align="center" justify="center" direction={"column"} padding={"5vw"}>
               {(greeting && !conversationStarted) ? (
                <Greeting 
                   avatarSrc={mafuyu.src}
                   greetingText={greeting.message}
                   buttonText={"Start Mock Interview"}
                   onButtonClick={handleGreetingAction}
               />
               ) : (
                   <ConversationBubbles />
               )}
            </Flex>
    )
}