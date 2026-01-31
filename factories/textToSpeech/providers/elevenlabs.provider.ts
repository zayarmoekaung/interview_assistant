import { TextToSpeech } from "../types/textToSpeech.type";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';

export class ElevenLabsTTS implements TextToSpeech {
    elevenlabs: ElevenLabsClient;
    constructor() {
        const key = process.env.ELEVEN_LABS_API_KEY;
        this.elevenlabs = new ElevenLabsClient({
            apiKey: key
        });
    }
    async generateSpeech (text: string) {
        const audio = await this.getAudioStream(text);
        play(audio);
    };
    async getAudioStream (text: string) {
        const voiceID = process.env.ELEVEN_LABS_VOICE_ID ? process.env.ELEVEN_LABS_VOICE_ID : "4tRn1lSkEn13EVTuqb0g";
        const audio = await this.elevenlabs.textToSpeech.convert(
            voiceID,
            {
                text: text,
                modelId: 'eleven_multilingual_v2',
                outputFormat: 'mp3_44100_128', 
            }
        );
        return audio;
    }
}