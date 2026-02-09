import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export interface VersionStoreData {
    kb_version: number,
}

interface VersionStoreState extends VersionStoreData{
    setKbVersion: (kb_version: number) => void;
    // New functions
    clearStore: () => void;
    restoreStore: (state: VersionStoreData) => void;
}

const initialState: VersionStoreData = {
    kb_version: 0,
};

export const useVersionStore = create(
    persist<VersionStoreState>(
        (set) => ({
            ...initialState, // Set initial state
            setKbVersion: (kb_version: number) => set({ kb_version }),
            // New clear and restore functions
            clearStore: () => set(initialState),
            restoreStore: (state: VersionStoreData) => set({ kb_version: state.kb_version }),
        }),
        {
            name: "version_storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)
