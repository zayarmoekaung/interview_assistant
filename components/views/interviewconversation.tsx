import { Flex } from "@chakra-ui/react"
import Greeting from "../greeting"
import { useMockInterviewStore } from "@/stores/useMockInterviewStore"
import mafuyu from "@/assets/images/avatars/mafuyu.jpg"
import { generateGreeting } from "@/services/mockInterview.service"
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore"
import { useModelStore } from "@/stores/useModelStore"
import { useInterviewNoteStore } from "@/stores/useInterviewNoteStore"
import { getInterviewNotes } from "@/utils/api/getInterviewNotes"
import { createMessage } from "@/helpers/message/message.helper"
import { Status } from "@/factories/message"
import { createTask } from "@/helpers/task/task.helper"
export const InterviewConversationViewer = () => {
    const greeting = useMockInterviewStore((state)=> state.greeting);
    const handleGreetingAction = async () => {
        const { selectedModel } = useModelStore.getState();
        const { jdText, resumeText } = useKnowledgeBaseStore.getState();
        const { setInterviewNotes } = useInterviewNoteStore.getState();
        const { setGreeting } = useMockInterviewStore.getState();


        const loading = createTask("Generating Interview Notes");
        const model = {
            name: selectedModel,
            type: selectedModel
        };

        try {
            if (!jdText || !resumeText) {
                throw new Error("Job Description or Resume text is missing.");
            }
            // Clear the existing greeting, so the notes can be displayed.
            setGreeting(null);

            const interviewNotesResponse = await getInterviewNotes(model, jdText, resumeText);
            if (interviewNotesResponse && interviewNotesResponse.notes) {
                setInterviewNotes(interviewNotesResponse.notes);
            } else {
                createMessage(Status.ERROR, 'Error parsing interview notes', 'AI model responded with an invalid format or no notes.');
            }
        } catch (error) {
            createMessage(Status.ERROR, "Error generating interview notes", error instanceof Error ? error.message : String(error));
        } finally {
            loading.stop();
        }
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