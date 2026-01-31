export async function textToSpeech(text: string): Promise<Blob> {

    const payload = {
        text
    };    
    const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`TTS API error: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    return audioBlob;
}