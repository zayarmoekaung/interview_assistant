import { NextRequest, NextResponse } from "next/server";
import { UserPrompt, SystemPrompt } from "@/prompts/interview_notes.prompt";
import { createAiModel } from "@/helpers/aiModel/aiModel.helper";
import { Model, ModelSchema, ModelType } from "@/types/model.type";

export async function POST(request: NextRequest) {
    const { jobDescription, resume, model } = await request.json();

    if (!jobDescription || !resume || !model) {
        return NextResponse.json({ error: 'Missing job description, resume, or model' }, { status: 400 });
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
        const userPrompt = UserPrompt(jobDescription, resume, mode);
        const response = await AiModelHelperInstance.generateWithSystemAndUserPrompts(systemPrompt, userPrompt, validatedModel.name);
        return NextResponse.json({ response });
    } catch (error: any) {
        console.error('Error generating interview notes:', error);
        return NextResponse.json({ error: 'Failed to generate interview notes' }, { status: 500 });
    }
}
