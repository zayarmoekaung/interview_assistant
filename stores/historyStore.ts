import { create } from 'zustand';
import { CombineStore } from './combineStore';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the structure for a single history entry
interface HistoryEntry {
  timestamp: number;
  state: CombineStore; // Now uses the combined type
}

// Define the HistoryStore's state
interface HistoryStoreState {
  history: Record<string, HistoryEntry>; // Changed to object with hexakey as key for direct lookup
  addHistory: (historyEntry: HistoryEntry, hexakey: string) => void;
  getHistory: (hexakey: string) => HistoryEntry | undefined; 
  deleteHistoryByKey: (hexakey: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create(
  persist<HistoryStoreState>(
    (set, get) => ({
      history: {},
      addHistory: (entry,hexakey) => {
        set((state) => ({
          history: { ...state.history, [hexakey]: entry },
        }));
      },
      getHistory: (hexakey: string) => get().history[hexakey],
      deleteHistoryByKey: (hexakey) => {
        set((state) => {
          const newHistory = { ...state.history };
          delete newHistory[hexakey]; 
          return { history: newHistory };
        });
      },
      clearHistory: () => set({ history: {} }),
    }),
    {
      name: "historyStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);