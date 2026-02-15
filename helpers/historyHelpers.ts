import { useHistoryStore } from '../stores/historyStore';
import { CombineStore, StoresToRestore } from '@/stores/combineStore';
import { useVersionStore } from '@/stores/useVersionStore';

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
  const kb_version = useVersionStore.getState().kb_version;
  const hexakey = kb_version.toString(16);
  const entry = { timestamp: kb_version, state: allStoreStates };
  addHistory(entry,hexakey);
  for (const storeName in StoresToRestore) {
    if (Object.prototype.hasOwnProperty.call(StoresToRestore, storeName)) {
      StoresToRestore[storeName].clearStore();
    }
  }
};
export const deleteHistory = (timestamp: number) => {
  const hexakey = timestamp.toString(16);
  const deleteHistory = useHistoryStore.getState().deleteHistoryByKey;
  deleteHistory(hexakey);
}
export const restoreHistory = (timestamp: number) => {
  const getHistory = useHistoryStore.getState().getHistory;
  const hexakey = timestamp.toString(16);
  const historyEntry = getHistory(hexakey);
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
