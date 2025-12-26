import { NextResponse, NextRequest } from "next/server";
import { ModelTypeEnum } from "@/types/model.type";
import { createAiModel } from "@/helpers/aiModel/aiModel.helper";
export async function GET(request: NextRequest) {
    const modelType = request.nextUrl.searchParams.get('modelType') || '';
    const modelName = request.nextUrl.searchParams.get('modelName') || '';
    const parsedModelType = ModelTypeEnum.safeParse(modelType);
    if (!parsedModelType.success) {
        return NextResponse.json({ error: 'Invalid or unsupported model type' }, { status: 400 });
    }
    const aiModel = createAiModel(parsedModelType.data);
    const isAvailable = await aiModel.getIsAvailable?.();
    if (isAvailable) {
        const health = await aiModel.getHealth?.(modelName);
        return NextResponse.json({ isAvailable: isAvailable ?? false, health });
    }
    return NextResponse.json({ isAvailable:false, health: { status: 'Unhealthy', message: 'AI model not configured' } });
}