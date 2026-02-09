import { RestorableStore } from '@/stores/combineStore';

// This assumes that the Zustand store's state object directly contains
// storeName, clearStore, restoreStore, and getSaveableState methods.
const createRestorableStoreEntry = (storeGetState: () => any): RestorableStore => {
    const state = storeGetState(); // Get the current state which includes the methods
    return {
        storeName: state.storeName,
        clearStore: () => state.clearStore(),
        restoreStore: (data: any) => state.restoreStore(data),
        getSaveableState: () => state.getSaveableState(),
    };
};

export { createRestorableStoreEntry };
