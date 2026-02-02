import { createAiConverseObject, createUserConverseObject } from "@/factories/converse/converse.factory";
import { ConversationStore } from "@/stores/useConversationStore";
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useMockInterviewStore } from "@/stores/useMockInterviewStore";
import { useEvaluationStore } from "@/stores/useEvaluationStore"; // New import
import { InterviewNote } from "@/types/interviewNote.type";
import { generateAndSetInterviewNotes, evaluateAnswer } from "@/services/mockInterview.service"; // Added evaluateAnswer
import { generateTTSAudio } from "@/services/generateTTSAudio.service";
import { createMessage } from "@/helpers/message/message.helper";
import { Status } from "@/factories/message";
import { useInterviewNoteStore } from "@/stores/useInterviewNoteStore"; // New import


export function addAiQuestionToConversation(note: InterviewNote) {
    const { addConverse } = ConversationStore.getState();
    const newConverse = createAiConverseObject(0, note);
    addConverse(newConverse);
}
export function addReply(text: string, isOutgoing: boolean) {
    const { conversation, addConverse } = ConversationStore.getState();
    const index = conversation.length
    const repliedTo = index - 1
    if (isOutgoing) {
        const newConverse = addUserConverse(text, index, repliedTo);
        addConverse(newConverse);

        // Get the current question converse
        const currentQuestionConverse = conversation.find(c => c.id === repliedTo);

        if (currentQuestionConverse && currentQuestionConverse.note) {
            // Evaluate the user's answer
            const evaluation = await evaluateAnswer(
                currentQuestionConverse.note.note,
                newConverse.text,
                currentQuestionConverse.id,
                newConverse.id
            );

            if (evaluation) {
                useEvaluationStore.getState().addEvaluation(evaluation);

                // Add general feedback as an AI converse
                const feedbackConverse = createAiConverseObject(0, { category: "Feedback", note: evaluation.generalFeedback });
                feedbackConverse.repliedTo = newConverse.id; // Reply to user's answer
                addConverse(feedbackConverse);

                // Get next question from the note store
                const { interviewNotes, setCurrentNoteIndex, currentNoteIndex } = useInterviewNoteStore.getState();
                if (interviewNotes && interviewNotes.length > currentNoteIndex + 1) {
                    const nextNote = interviewNotes[currentNoteIndex + 1];
                    addAiQuestionToConversation(nextNote);
                    setCurrentNoteIndex(currentNoteIndex + 1);
                } else {
                    createMessage(Status.INFO, "Interview Complete", "You have answered all questions.");
                }
            }
        }

    } else {

    }
}
function addUserConverse(text: string, index: number, repliedTo: number) {
    const newConverse = createUserConverseObject(index, text, repliedTo);
    return newConverse;
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
export function restartConversation() {
    const { clearConversation } = ConversationStore.getState()
    clearConversation()
}
export async function generateGreetingAudio(): Promise<Blob | null> {
    const { greeting, audioBlob, setAudioBlob } = useMockInterviewStore.getState()
    if (audioBlob) {
        //return audioBlob;
    }
    if (greeting && greeting.message) {
        const blob = await generateTTSAudio(greeting.message)
        if (blob) {
            setAudioBlob(blob);
            return blob;
        }
    }
    return null;
}