import { useHistoryStore} from '../stores/historyStore';
import { CombineStore,StoresToRestore } from '@/stores/combineStore';


export const createSnapShot = () => {
    const stateSnapshot: { [key: string]: any } = {};
  for (const storeName in StoresToRestore) {
    if (Object.prototype.hasOwnProperty.call(StoresToRestore, storeName)) {
      stateSnapshot[storeName] = StoresToRestore[storeName].getSaveableState();
    }
  }
  return stateSnapshot;
}
export const saveAndClearStores = (allStoreStates: CombineStore) => {
  const addHistory = useHistoryStore.getState().addHistory;
  addHistory(allStoreStates);
};

export const restoreHistory = (timestamp: number) => {
  const history = useHistoryStore.getState().history;
  const historyEntry = history.find(entry => entry.timestamp === timestamp);

  if (!historyEntry) {
    console.warn(`No history entry found for timestamp: ${timestamp}`);
    return;
  }

  // Apply the historical state back to the stores
  for (const storeName in StoresToRestore) {
    if (Object.prototype.hasOwnProperty.call(StoresToRestore, storeName)) {
      const storedState = historyEntry.state[storeName];
      if (storedState) {
        StoresToRestore[storeName].restoreStore(storedState);
      } else {
        console.warn(`No state found for store "${storeName}" in history entry ${timestamp}`);
      }
    }
  }
  console.log(`History entry with timestamp ${timestamp} restored.`);
};
