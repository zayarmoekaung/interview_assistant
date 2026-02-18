export async function playAudioFromBlob(audioBlob: Blob):Promise<void>{
    const freshBlob = new Blob([audioBlob], { type: audioBlob.type });
    const audioUrl = URL.createObjectURL(freshBlob);
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