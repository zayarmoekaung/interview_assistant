import { create } from 'zustand';
import { Converse } from "@/factories/converse/types/converse.type";
import { AnswerEvaluation } from "@/types/answerEvaluation.type";
import { InterviewNote } from '@/types/interviewNote.type';
import { Task } from "@/factories/task/types/task.type";
import { Message } from '@/factories/message/types/message.type';
import { Greeting } from "@/types/interviewResponse.type";
import { ModelType } from "@/types/model.type";
import { Modes } from "@/types/mode.type";
import { ResumeMatchResponse } from "@/types/resumeMatchResponse.type";

// Define the combined state of all other stores
interface AllStoreStates {
    conversation: Converse[];
    isLoading: boolean; // From useConversationStore & useLoadingStore
    evaluations: AnswerEvaluation[];
    interviewNotes: InterviewNote[];
    currentNoteIndex: number;
    jdText: string;
    resumeText: string;
    tasks: Task[];
    messages: Message[];
    greeting: Greeting | null;
    audioBlob: Blob | null;
    conversationStarted: boolean;
    selectedModel: ModelType;
    availableModels: ModelType[];
    globalMode: Modes;
    analysisResult: ResumeMatchResponse | null;
    kb_version: number;
}

// Define the structure for a single history entry
interface HistoryEntry {
  timestamp: number;
  state: AllStoreStates; // Now uses the combined type
}

// Define the HistoryStore's state
interface HistoryStoreState {
  history: HistoryEntry[];
  addHistory: (stateSnapshot: AllStoreStates) => void; // Updated to use combined type
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStoreState>((set) => ({
  history: [],
  addHistory: (stateSnapshot) =>
    set((state) => ({
      history: [...state.history, { timestamp: Date.now(), state: stateSnapshot }],
    })),
  clearHistory: () => set({ history: [] }),
}));
