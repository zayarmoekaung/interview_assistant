import { textToSpeech } from "@/utils/api/textToSpeech";
import { Status } from "@/factories/message";
import { createMessage } from "@/helpers/message/message.helper";

export async function generateTTSAudio(text: string):Promise<Blob>{
    try {
        const audioBlob = await textToSpeech(text);
        return audioBlob;
    } catch (error) {
        console.error("Error in generateTTSAudio:", error);
        createMessage(Status.ERROR, 'Error in generateTTSAudio:', error instanceof Error ? error.message : String(error));
        throw error;
    }
}