import { create } from "zustand";
import { Modes } from "@/types/mode.type";
import { persist, createJSONStorage } from 'zustand/middleware'
 
interface ModeState {
    globalMode: Modes,
    switchMode: (mode: Modes) => void
}
export const useModeStore = create(
    persist<ModeState>(
        (set)=>(
            {
                globalMode: Modes.ANALYSIS,
                switchMode:(mode: Modes)=>set({globalMode:mode})
            }
        ),
        {
            name: 'mode-storage',
            storage: createJSONStorage(()=>localStorage)
        }
    )
);

