export async function playAudioFromBlob(audioBlob: Blob):Promise<void>{
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
}