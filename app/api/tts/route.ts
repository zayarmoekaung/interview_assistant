import { NextRequest, NextResponse } from 'next/server';
import { generateStream } from '@/helpers/conversation/tts.helper';

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();  
        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const apiKey = process.env.ELEVEN_LABS_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const audioStream = await generateStream(text)
        return new NextResponse(audioStream as ReadableStream, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'inline; filename="tts.mp3"',  
            },
        });
    } catch (error) {
        console.error('TTS Error:', error);
        return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }
}