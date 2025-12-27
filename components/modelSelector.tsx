import { useEffect } from "react";
import { Button, Menu,Portal} from "@chakra-ui/react";

import { useModelStore } from "@/stores/useModelStore";
import { ModelType } from "@/types/model.type";
import { getAvailabelModels } from "@/services/getAvailableModels.service";
export function ModelSelector() {
  const {
    setSelectedModel,
    availableModels,
    selectedModel,
  } = useModelStore();

  useEffect(() => {
    if (availableModels.length === 0) {
      getAvailabelModels
    }
  }, []);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
            {selectedModel || "Select Model"} 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
        </Button>
      </Menu.Trigger>
    <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {availableModels.map((model) => (
          <Menu.Item
            key={model}
            onClick={() => setSelectedModel(model as ModelType)}
            fontWeight={model === selectedModel ? "bold" : "normal"}
            value={model}
          >
            {model}
          </Menu.Item>
        ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
