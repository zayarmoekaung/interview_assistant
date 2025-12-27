import { useModelStore } from "@/stores/useModelStore";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useResumeAnalysisStore } from "@/stores/useResumeAnalysisStore";
import { useJDResumeStore } from "@/stores/useJDResumeStore";
import { useMessageStore } from "@/stores/useMessageStore";
import { analyseResume } from "@/utils/api/analyseResume";

import { ResumeMatchResponseSchema } from "@/types/resumeMatchResponse.type";
import { ModelType } from "@/types/model.type";
import { Status } from "@/helpers/message/types/message.type";
export async function generateAnalysis() {
    const { selectedModel } = useModelStore.getState();
    const { jdText, resumeText } = useJDResumeStore.getState();
    const { addTask } = useLoadingStore.getState();
    const { setAnalysisResult } = useResumeAnalysisStore.getState();
    const { addMessage } = useMessageStore.getState()
    const modelnames = {
        [ModelType.GEMINI]: "gemini-2.5-flash",
        [ModelType.OPENAI]: "gpt-4",
        [ModelType.LOCAL]: "mythomax-l2-13b.Q4_K_M.gguf"
    }
    const loading = addTask("Analyzing Resume");

    try {
        if (!jdText || !resumeText) {
            throw new Error("Job Description or Resume text is missing.");
        }
        const model = {
            name: modelnames[selectedModel],
            type: selectedModel
        }
        const analysis = await analyseResume(model, resumeText, jdText);
        const parsedAnalysis = ResumeMatchResponseSchema.safeParse(analysis);
        if (!parsedAnalysis.success) {
            addMessage(Status.ERROR, 'Error pursing resume analysis', 'AI model responsed invalid format');
        }
        setAnalysisResult(analysis);
        addMessage(Status.SUCCESS, 'Resume Analysis Complete', '');
    } catch (error) {
        addMessage(Status.ERROR, 'Error during resume analysis', error instanceof Error ? error.message : String(error));
        setAnalysisResult(null);
    } finally {
        loading.stop();
    }
}