import { createAiConverseObject } from "@/factories/converse/converse.factory";
import { ConversationStore } from "@/stores/useConversationStore";
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useMockInterviewStore } from "@/stores/useMockInterviewStore";
import { InterviewNote } from "@/types/interviewNote.type";
import { generateAndSetInterviewNotes } from "@/services/mockInterview.service";
import { createMessage } from "@/helpers/message/message.helper";
import { Status } from "@/factories/message";

export function addAiQuestionToConversation(note: InterviewNote) {
    const { addConverse } = ConversationStore.getState();
    const newConverse = createAiConverseObject(0, note);
    addConverse(newConverse);
}

export async function initializeConversation() {
    const { jdText, resumeText } = useKnowledgeBaseStore.getState();
    const { setConversationStarted } = useMockInterviewStore.getState();

    if (!jdText || !resumeText) {
        createMessage(Status.ERROR, "Missing Data", "Job Description or Resume text is missing.");
        throw new Error("Job Description or Resume text is missing.");
    }
    const interviewNotes = await generateAndSetInterviewNotes(jdText, resumeText);
    if (interviewNotes && interviewNotes.length > 0) {
        const firstNote = interviewNotes[0];
        addAiQuestionToConversation(firstNote);
        setConversationStarted(true);

    } else {
        createMessage(Status.ERROR, "No Notes Generated", "Could not generate interview notes from the provided JD and Resume.");
    }
}
export function restartConversation(){
    const { clearConversation } = ConversationStore.getState()
    clearConversation()
}