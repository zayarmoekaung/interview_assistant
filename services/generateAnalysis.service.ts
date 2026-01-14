import { useModelStore } from "@/stores/useModelStore";
import { useResumeAnalysisStore } from "@/stores/useResumeAnalysisStore";
import { useJDResumeStore } from "@/stores/useJDResumeStore";
import { analyseResume } from "@/utils/api/analyseResume";

import { ResumeMatchResponseSchema } from "@/types/resumeMatchResponse.type";
import { ModelType } from "@/types/model.type";
import { Status } from "@/helpers/message/types/message.type";
import { createMessage } from "@/helpers/message/message.helper";
import { createTask } from "@/helpers/task/task.helper";
export async function generateAnalysis() {
    const { selectedModel } = useModelStore.getState();
    const { jdText, resumeText } = useJDResumeStore.getState();
    const { setAnalysisResult } = useResumeAnalysisStore.getState();
    const modelnames = {
        [ModelType.GEMINI]: "gemini-2.5-flash",
        [ModelType.OPENAI]: "gpt-4",
        [ModelType.LOCAL]: "mythomax-l2-13b.Q4_K_M.gguf"
    }
    const loading = createTask("Analyzing Resume");

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
            createMessage(Status.ERROR, 'Error pursing resume analysis', 'AI model responsed invalid format');
        }
        setAnalysisResult(analysis);
        createMessage(Status.SUCCESS, 'Resume Analysis Complete', '');
    } catch (error) {
        createMessage(Status.ERROR, 'Error during resume analysis', error instanceof Error ? error.message : String(error));
        setAnalysisResult(null);
    } finally {
        loading.stop();
    }
}