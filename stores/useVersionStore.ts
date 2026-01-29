import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

interface versionStoreState {
    kb_version: number,
    setKbVersion: (kb_version: number) => void;
}

export const useVersionStore = create(
    persist<versionStoreState>(
        (set) =>({
            kb_version: 0,
            setKbVersion: (kb_version: number) => set({kb_version})
        }),
        {
            name: "version_storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)
