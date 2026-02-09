import { create } from 'zustand';
import { CombineStore } from './combineStore';

// Define the structure for a single history entry
interface HistoryEntry {
  timestamp: number;
  state: CombineStore; // Now uses the combined type
}

// Define the HistoryStore's state
interface HistoryStoreState {
  history: HistoryEntry[];
  addHistory: (stateSnapshot: CombineStore) => void; 
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
