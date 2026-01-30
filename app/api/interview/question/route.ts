import { NextRequest, NextResponse } from "next/server";
import { UserPrompt, SystemPrompt } from "@/prompts/interview_question.prompt";
import { createAiModel } from "@/helpers/aiModel/aiModel.helper";
import { Model, ModelSchema, ModelType } from "@/types/model.type";
import { InterviewNote, InterviewNoteSchema } from "@/types/interviewNote.type";

export async function POST(request: NextRequest) {
    const { interviewNote, model } = await request.json();

    if (!interviewNote || !model) {
        return NextResponse.json({ error: 'Missing interview note or model' }, { status: 400 });
    }

    const parsedModel = ModelSchema.safeParse(model);
    if (!parsedModel.success) {
        return NextResponse.json({ error: 'Invalid model format or unsupported model type' }, { status: 400 });
    }
    const validatedModel: Model = parsedModel.data;

    const parsedInterviewNote = InterviewNoteSchema.safeParse(interviewNote);
    if (!parsedInterviewNote.success) {
        return NextResponse.json({ error: 'Invalid interview note format' }, { status: 400 });
    }
    const validatedInterviewNote: InterviewNote = parsedInterviewNote.data;

    try {
        const AiModelHelperInstance = createAiModel(validatedModel.type);
        const systemPrompt = SystemPrompt();
        const mode = validatedModel.type === ModelType.LOCAL ? 'plain' : 'b64';
        const userPrompt = UserPrompt(validatedInterviewNote, mode);
        const response = await AiModelHelperInstance.generateWithSystemAndUserPrompts(systemPrompt, userPrompt, validatedModel.name);
        return NextResponse.json({ response });
    } catch (error: any) {
        console.error('Error generating interview question:', error);
        return NextResponse.json({ error: 'Failed to generate interview question' }, { status: 500 });
    }
}
