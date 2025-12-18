import { NextResponse, NextRequest } from 'next/server';
import { createAiModel } from '@/helpers/aiModel/aiModel.helper';
import { Model,ModelSchema } from '@/types/model.type';
export async function POST(request: NextRequest) {
    const { prompt, model } = await request.json();
    if (!prompt || !model) {
        return NextResponse.json({ error: 'Missing prompt or model' }, { status: 400 });
    }
    const parsedModel = ModelSchema.safeParse(model);
    if (!parsedModel.success) {
        return NextResponse.json({ error: 'Invalid model format or unsupported model type' }, { status: 400 });
    }
    const validatedModel: Model = parsedModel.data;
    try {
        const AiModelHelperInstance =  createAiModel(validatedModel.type);
        const response = await AiModelHelperInstance.generateResponse(prompt,validatedModel.name);
        return NextResponse.json({ response });
    } catch (error: any) {
        console.error('Error generating response:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}

