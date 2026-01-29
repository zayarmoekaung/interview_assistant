import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useVersionStore } from "@/stores/useVersionStore";
import { getTimeStamp } from "@/helpers/time.helper";

export class KbVersionUpdater {
    private unsubscribe: () => void;
    private prevState: [string, string] | null = null;

    constructor() {
        this.unsubscribe = useKnowledgeBaseStore.subscribe(
            (state) => {
                const currentState: [string, string] = [state.jdText, state.resumeText];
                if (this.prevState && (currentState[0] !== this.prevState[0] || currentState[1] !== this.prevState[1])) {
                    useVersionStore.getState().setKbVersion(getTimeStamp());
                }
                this.prevState = currentState;
            }
        );
    }
    public destroy() {
        this.unsubscribe();
    }
}