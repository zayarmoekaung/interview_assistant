import { useModelStore } from "@/stores/useModelStore";
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useVersionStore } from "@/stores/useVersionStore";
import { useResumeAnalysisStore } from "@/stores/useResumeAnalysisStore";
import { interviewGreeting } from "@/utils/api/interviewGreeting";
import { useMockInterviewStore } from "@/stores/useMockInterviewStore";
import { GreetingMatchSchema } from "@/types/interviewResponse.type";
import { InterviewNotesResponseSchema } from "@/types/interviewNotesResponse.type";
import { InterviewQuestion, InterviewQuestionSchema } from "@/types/interviewQuestion.type";
import { ModelType } from "@/types/model.type";
import { Status } from "@/factories/message";
import { createMessage } from "@/helpers/message/message.helper";
import { createTask } from "@/helpers/task/task.helper";

import { getInterviewQuestion } from "@/utils/api/getInterviewQuestion";
import { InterviewNote } from "@/types/interviewNote.type";

import { getInterviewNotes } from "@/utils/api/getInterviewNotes";
import { useInterviewNoteStore } from "@/stores/useInterviewNoteStore";

export async function generateAndSetInterviewNotes(jdText: string, resumeText: string): Promise<InterviewNote[] | null> {
    const { selectedModel } = useModelStore.getState();
    const { setInterviewNotes } = useInterviewNoteStore.getState();
    const modelnames = {
        [ModelType.GEMINI]: "gemini-2.5-flash",
        [ModelType.OPENAI]: "gpt-4",
        [ModelType.LOCAL]: "mythomax-l2-13b.Q4_K_M.gguf"
    }
    const model = {
        name: modelnames[selectedModel],
        type: selectedModel
    }
    const loading = createTask("Generating Interview Notes");
    try {
        const interviewNotesResponse = await getInterviewNotes(model, jdText, resumeText);
        const parsedINterviewNote = InterviewNotesResponseSchema.safeParse(interviewNotesResponse);
        if (!parsedINterviewNote.success) {
            createMessage(Status.ERROR, 'Error parsing interview notes', 'AI model responsed invalid format');
        }
        if (parsedINterviewNote.data && parsedINterviewNote.data.notes) {
            setInterviewNotes(parsedINterviewNote.data.notes);
            return parsedINterviewNote.data.notes;
        } else {
            createMessage(Status.ERROR, 'Error parsing interview notes', 'AI model responded with an invalid format or no notes.');
            return null;
        }
    } catch (error) {
        createMessage(Status.ERROR, "Error generating interview notes", error instanceof Error ? error.message : String(error));
        return null;
    } finally {
        loading.stop();
    }
}

export async function generateInterviewQuestion(interviewNote: InterviewNote): Promise<InterviewQuestion | null> {
    const { selectedModel } = useModelStore.getState();
    const modelnames = {
        [ModelType.GEMINI]: "gemini-2.5-flash",
        [ModelType.OPENAI]: "gpt-4",
        [ModelType.LOCAL]: "mythomax-l2-13b.Q4_K_M.gguf"
    }
    const model = {
        name: modelnames[selectedModel],
        type: selectedModel
    }
    try {
        const interviewQuestionResponse = await getInterviewQuestion(model, interviewNote);
        const parsednterviewQuestion = InterviewQuestionSchema.safeParse(interviewQuestionResponse);
        if (!parsednterviewQuestion.success) {
            createMessage(Status.ERROR, 'Error parsing interview question', 'AI model responded with an invalid format or no question.');
        }
        if (parsednterviewQuestion.data && parsednterviewQuestion.data.question) {
            return parsednterviewQuestion.data;
        } else {
            createMessage(Status.ERROR, 'Error parsing interview question', 'AI model responded with an invalid format or no question.');
            return null;
        }
    } catch (questionError) {
        createMessage(Status.ERROR, "Error generating interview question", questionError instanceof Error ? questionError.message : String(questionError));
        return null;
    }
}

export async function generateGreeting() {
    const { selectedModel } = useModelStore.getState();
    const { jdText} = useKnowledgeBaseStore.getState();
    const { kb_version } = useVersionStore.getState();
    const { analysisResult } = useResumeAnalysisStore.getState();
    const { setGreeting } = useMockInterviewStore.getState();
    const modelnames = {
        [ModelType.GEMINI]: "gemini-2.5-flash",
        [ModelType.OPENAI]: "gpt-4",
        [ModelType.LOCAL]: "mythomax-l2-13b.Q4_K_M.gguf"
    }
    const candidatename = analysisResult?.name || 'unavailable';
    const position = analysisResult?.position || 'unavailable';
    const loading = createTask("Generating Greeting");
    const model = {
        name: modelnames[selectedModel],
        type: selectedModel
    }
    try {
         if (!jdText) {
            throw new Error("Job Description or Resume text is missing.");
        }
        const greeting = await interviewGreeting( model,candidatename,position,jdText)
        greeting.kb_version = kb_version ? kb_version : 101;
        const parsedGreeting = GreetingMatchSchema.safeParse(greeting);
        if (!parsedGreeting.success) {
            createMessage(Status.ERROR, 'Error pursing greeting', 'AI model responsed invalid format');
        }
        setGreeting(greeting);
        loading.stop();
    } catch (error) {
        createMessage(Status.ERROR,"Error generating greeting",error instanceof Error ? error.message : String(error));
    }finally{
        loading.stop();
    }

}