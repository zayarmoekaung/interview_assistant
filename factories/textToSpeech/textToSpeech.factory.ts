import { TextToSpeech } from "./types/textToSpeech.type";
import { ElevenLabsTTS } from "./providers/elevenlabs.provider";

export const createTextToSpeechObject = ():TextToSpeech =>{
    const TTS = new ElevenLabsTTS();
    return TTS;
}