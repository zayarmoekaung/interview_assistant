import { create } from 'zustand';

// Define the structure for a single history entry
interface HistoryEntry {
  timestamp: number; // Timestamp when the history was saved (e.g., Date.now())
  state: any;       // The captured state of other stores. Using 'any' for now,
                    // but this should be refined to a more specific type
                    // once the exact structure of other stores is known.
}

// Define the HistoryStore's state
interface HistoryStoreState {
  history: HistoryEntry[];
  addHistory: (stateSnapshot: any) => void;
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
