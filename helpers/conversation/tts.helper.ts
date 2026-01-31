import { createTextToSpeechObject } from "@/factories/textToSpeech/textToSpeech.factory";

export const generateTTS = async (text:string) => {
    const tts = createTextToSpeechObject();
    tts.generateSpeech(text);
}
export const generateStream = async (text: string) => {
    const tts = createTextToSpeechObject();
    return tts.getAudioStream(text);
}