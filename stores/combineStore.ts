import { useConversationStore } from "./useConversationStore";
import { useEvaluationStore } from "./useEvaluationStore";
interface RestorableStore {
   storeName: string;
   clearStore: () => void;
   restoreStore: (state: any) => void;
   getSaveableState: () => any;
}
interface StoresToRestore {
  [key: string]: RestorableStore; 
}
export interface CombineStore {
    [key: string]: any
}
export const StoresToRestore: StoresToRestore = {
    "conversationStore" : useConversationStore.getState(),
}