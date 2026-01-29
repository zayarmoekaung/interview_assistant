import { NextRequest, NextResponse } from "next/server";
import { UserPrompt, SystemPrompt } from "@/prompts/evaluate_answer.prompt";
import { createAiModel } from "@/helpers/aiModel/aiModel.helper";
import { Model, ModelSchema, ModelType } from "@/types/model.type";

export async function POST(request: NextRequest) {
    const { question, answer, model } = await request.json();

    if (!question || !answer || !model) {
        return NextResponse.json({ error: 'Missing interview question, answer, or model' }, { status: 400 });
    }

    const parsedModel = ModelSchema.safeParse(model);
    if (!parsedModel.success) {
        return NextResponse.json({ error: 'Invalid model format or unsupported model type' }, { status: 400 });
    }
    const validatedModel: Model = parsedModel.data;

    try {
        const AiModelHelperInstance = createAiModel(validatedModel.type);
        const systemPrompt = SystemPrompt();
        const mode = validatedModel.type === ModelType.LOCAL ? 'plain' : 'b64';
        const userPrompt = UserPrompt(question, answer, mode);
        const response = await AiModelHelperInstance.generateWithSystemAndUserPrompts(systemPrompt, userPrompt, validatedModel.name);
        return NextResponse.json({ response });
    } catch (error: any) {
        console.error('Error generating answer evaluation:', error);
        return NextResponse.json({ error: 'Failed to generate answer evaluation' }, { status: 500 });
    }
}
