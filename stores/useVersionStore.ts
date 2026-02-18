import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export interface VersionStoreData {
    kb_version: number,
}

interface VersionStoreState extends VersionStoreData{
    storeName: string; // Added
    setKbVersion: (kb_version: number) => void;
    clearStore: () => void;
    restoreStore: (state: VersionStoreData) => void;
    getSaveableState: () => VersionStoreData; // Added
}

const initialState: VersionStoreData = {
    kb_version: 0,
};

export const useVersionStore = create(
    persist<VersionStoreState>(
        (set, get) => ({
            ...initialState,
            storeName: "versionStore", // Added
            setKbVersion: (kb_version: number) => set({ kb_version }),
            clearStore: () => set(initialState),
            restoreStore: (state: VersionStoreData) => set({ kb_version: state.kb_version }),
            getSaveableState: () => ({
                kb_version: get().kb_version,
            }),
        }),
        {
            name: "version_storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)
