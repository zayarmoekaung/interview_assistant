import { textToSpeech } from "@/utils/api/textToSpeech";
import { Status } from "@/factories/message";
import { createMessage } from "@/helpers/message/message.helper";

export async function generateTTSAudio(text: string): Promise<void> {
    try {
        const audioBlob = await textToSpeech(text);

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        return new Promise<void>((resolve, reject) => {
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                resolve();
            };
            audio.onerror = (event) => {
                URL.revokeObjectURL(audioUrl);
                reject(new Error("Audio playback failed."));
            };
            audio.play().catch(reject);
        });

    } catch (error) {
        console.error("Error in generateTTSAudio:", error);
        createMessage(Status.ERROR, 'Error in generateTTSAudio:', error instanceof Error ? error.message : String(error));
        throw error;
    }
}