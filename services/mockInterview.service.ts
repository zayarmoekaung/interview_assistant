import { useModelStore } from "@/stores/useModelStore";
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useVersionStore } from "@/stores/useVersionStore";
import { useResumeAnalysisStore } from "@/stores/useResumeAnalysisStore";
import { interviewGreeting } from "@/utils/api/interviewGreeting";
import { useMockInterviewStore } from "@/stores/useMockInterviewStore";
import { GreetingMatchSchema } from "@/types/interviewResponse.type";
import { ModelType } from "@/types/model.type";
import { Status } from "@/factories/message";
import { createMessage } from "@/helpers/message/message.helper";
import { createTask } from "@/helpers/task/task.helper";

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