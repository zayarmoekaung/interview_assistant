import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { AllStoreStates } from "./historyStore"; // Import AllStoreStates

interface versionStoreState {
    kb_version: number,
    setKbVersion: (kb_version: number) => void;
    // New functions
    clearStore: () => void;
    restoreStore: (state: AllStoreStates) => void;
}

const initialState: Omit<versionStoreState, "setKbVersion" | "clearStore" | "restoreStore"> = {
    kb_version: 0,
};

export const useVersionStore = create(
    persist<versionStoreState>(
        (set) =>({
            ...initialState, // Set initial state
            setKbVersion: (kb_version: number) => set({kb_version}),
            // New clear and restore functions
            clearStore: () => set(initialState),
            restoreStore: (state: AllStoreStates) => set({ kb_version: state.kb_version }),
        }),
        {
            name: "version_storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)
