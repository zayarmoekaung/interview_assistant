import { NextResponse, NextRequest } from 'next/server';
import { createAiModel } from '@/helpers/aiModel/aiModel.helper';
import { ModelTypeEnum } from '@/types/model.type';
export async function GET(request: NextRequest) {
    const modelType =  request.nextUrl.searchParams.get('modelType') || '';
    const parsedModelType = ModelTypeEnum.safeParse(modelType);
    if (!parsedModelType.success) {
        return NextResponse.json({ error: 'Invalid or unsupported model type' }, { status: 400 });
    }
    const validatedModelType = parsedModelType.data;
    try {
        const AiModelHelperInstance =  createAiModel(validatedModelType);
        if (!AiModelHelperInstance.getAvailableModels) {
            return NextResponse.json({ error: 'getAvailableModels method not implemented for this model type' }, { status: 400 });
        }
        const models = await AiModelHelperInstance.getAvailableModels();
        return NextResponse.json({ models });
    }catch (error: any) {
        console.error('Error fetching models:', error);
        return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }
}