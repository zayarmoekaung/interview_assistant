import { create } from "zustand";
import { ModelType } from "@/types/model.type";
import { persist, createJSONStorage } from 'zustand/middleware'

interface ModelState {
    selectedModel: ModelType;
    setSelectedModel: (modelName: ModelType) => void;
    setModels: (modelTypes: ModelType[]) => void;
    availableModels: ModelType[];
}
export const useModelStore = create(
    persist<ModelState>(
        (set) => ({
            selectedModel: ModelType.GEMINI,
            availableModels: [],
            setSelectedModel: (modelName: ModelType) => set({ selectedModel: modelName }),
            setModels: (modelTypes: ModelType[]) => set({availableModels: modelTypes}),
        }),
        {
            name: 'model-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);