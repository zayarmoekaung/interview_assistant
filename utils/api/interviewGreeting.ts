import { Model, ModelType } from "@/types/model.type";
import { encodeBase64 } from "@/helpers/base64.helper";
import { decodeJsonFromMarkdown } from "@/helpers/json.helper";
import { sanitizeForLLM } from "@/helpers/sanitize.helper";
import { makePostRequest } from "@/helpers/axios/request.helper";
import { Greeting } from "@/types/interviewResponse.type";
export async function interviewGreeting(model: Model,candidateName: string, position: string, jobDescription:string):Promise<Greeting>{
       const encodedJd = model.type == ModelType.LOCAL ? sanitizeForLLM(jobDescription) : encodeBase64(jobDescription);
        const encodedName = model.type == ModelType.LOCAL ? sanitizeForLLM(candidateName) : encodeBase64(candidateName);
        const encodedPosition = model.type == ModelType.LOCAL ? sanitizeForLLM(position) : encodeBase64(position);

        const payload = {
            model: model,
            candidateName: encodedName,
            position: encodedPosition,
            jobDescription: encodedJd
        };
        const response = await makePostRequest('/api/interview/greet',payload);
        const decoded = decodeJsonFromMarkdown(response.response);
        return decoded as Greeting
}