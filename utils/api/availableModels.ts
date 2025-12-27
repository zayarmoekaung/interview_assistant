import { makeGetRequest } from "@/helpers/axios/request.helper";
import { ModelType } from "@/types/model.type";
export async function availableModels():Promise<ModelType[]>{
    const res = await makeGetRequest("/api/getmodeltypes");
    const modelTypes = res.modelTypes as ModelType[];
    return modelTypes;
}