declare global {
  interface ReadableStream<R = any> {
    [Symbol.asyncIterator](): AsyncIterableIterator<R>;
  }
}
export interface TextToSpeech {
    generateSpeech: (text:string) => void
    getAudioStream: (text:string) => Promise<ReadableStream>
}