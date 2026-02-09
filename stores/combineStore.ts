import { useConversationStore } from "./useConversationStore";
import { useEvaluationStore } from "./useEvaluationStore";
import { useInterviewNoteStore } from "./useInterviewNoteStore";
import { useKnowledgeBaseStore } from "./useKnowledgeBaseStore";
import { useMockInterviewStore } from "./useMockInterviewStore";
import { useResumeAnalysisStore } from "./useResumeAnalysisStore";
import { useVersionStore } from "./useVersionStore";

import { createRestorableStoreEntry } from '@/helpers/storeHelpers';

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
    "conversationStore": createRestorableStoreEntry(useConversationStore.getState),
    "evaluationStore": createRestorableStoreEntry(useEvaluationStore.getState),
    "interviewNoteStore": createRestorableStoreEntry(useInterviewNoteStore.getState),
    "knowledgeBaseStore": createRestorableStoreEntry(useKnowledgeBaseStore.getState),
    "mockInterviewStore": createRestorableStoreEntry(useMockInterviewStore.getState),
    "resumeAnalysisStore": createRestorableStoreEntry(useResumeAnalysisStore.getState),
    "versionStore": createRestorableStoreEntry(useVersionStore.getState),
};
