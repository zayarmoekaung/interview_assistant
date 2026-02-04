import { useHistoryStore } from '../stores/historyStore';

interface StoresToSnapshot {
  [key: string]: () => any; // A map where key is store name and value is a function to get its state
}

// New interface for stores that can be restored, assuming they have a `restoreState` method
interface RestorableStore {
  restoreState: (state: any) => void;
}

interface StoresToRestore {
  [key: string]: RestorableStore; // A map where key is store name and value is a store instance with a restoreState method
}

export const saveAndClearStores = (storesToSnapshot: StoresToSnapshot) => {
  const addHistory = useHistoryStore.getState().addHistory;

  const stateSnapshot: { [key: string]: any } = {};
  for (const storeName in storesToSnapshot) {
    if (Object.prototype.hasOwnProperty.call(storesToSnapshot, storeName)) {
      stateSnapshot[storeName] = storesToSnapshot[storeName]();
    }
  }

  addHistory(stateSnapshot);

  console.log("States saved to history. Individual stores need to be cleared manually or via their own reset functions.");
};

export const restoreHistory = (timestamp: number, storesToRestore: StoresToRestore) => {
  const history = useHistoryStore.getState().history;
  const historyEntry = history.find(entry => entry.timestamp === timestamp);

  if (!historyEntry) {
    console.warn(`No history entry found for timestamp: ${timestamp}`);
    return;
  }

  // Apply the historical state back to the stores
  for (const storeName in storesToRestore) {
    if (Object.prototype.hasOwnProperty.call(storesToRestore, storeName)) {
      const storedState = historyEntry.state[storeName];
      if (storedState) {
        storesToRestore[storeName].restoreState(storedState);
      } else {
        console.warn(`No state found for store "${storeName}" in history entry ${timestamp}`);
      }
    }
  }
  console.log(`History entry with timestamp ${timestamp} restored.`);
};
