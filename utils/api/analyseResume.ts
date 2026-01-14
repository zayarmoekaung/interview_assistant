import { ResumeMatchResponse } from "@/types/resumeMatchResponse.type";
import { Model, ModelType } from "@/types/model.type";
import { encodeBase64 } from "@/helpers/base64.helper";
import { decodeJsonFromMarkdown } from "@/helpers/json.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";
import { makePostRequest } from "@/helpers/axios/request.helper";

export async function analyseResume(model: Model, resume: string, jd: string): Promise<ResumeMatchResponse> {
   const encodedResume = model.type == ModelType.LOCAL ? sanitizeForLLM(resume) : encodeBase64(resume);
   const encodedJd = model.type == ModelType.LOCAL ? sanitizeForLLM(jd) : encodeBase64(jd);
   const payload = {
       model,
       resume: encodedResume,
       jobDescription: encodedJd,
   };
    const response = await makePostRequest("/api/analyze", payload);
    console.log("Analyse Resume Response:", response);
    const decoded = decodeJsonFromMarkdown(response.response)
    return decoded as ResumeMatchResponse;
}