import React from 'react';
import { Box, Button, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { useHistoryStore } from '../stores/historyStore';
import HistoryEntryCard from './HistoryEntryCard';
import { restoreHistory } from '../helpers/historyHelpers';

// Define an interface for the props that HistoryManager will accept.
// This is crucial for passing the actual store instances for restoration.
interface HistoryManagerProps {
  // A map of store instances that can be restored.
  // Each store instance is expected to have a `restoreState` method.
  storesToRestore: { [key: string]: { restoreState: (state: any) => void; }; };
}

const HistoryManager: React.FC<HistoryManagerProps> = ({ storesToRestore }) => {
  const { history, clearHistory } = useHistoryStore();

  const handleDelete = (timestampToDelete: number) => {
    // Implement actual deletion logic for a single entry in useHistoryStore
    // This will likely involve filtering the history array and updating the store.
    // For now, let's log a message.
    console.log(`Deleting history entry with timestamp: ${timestampToDelete}`);
    useHistoryStore.setState((state) => ({
      history: state.history.filter(entry => entry.timestamp !== timestampToDelete)
    }));
  };

  const handleRestore = (timestampToRestore: number) => {
    // Call the helper function to restore state
    restoreHistory(timestampToRestore, storesToRestore);
    console.log(`Restoring history entry with timestamp: ${timestampToRestore}`);
  };

  return (
    <Box p={5} className="w-full max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl">
      <Heading as="h2" size="lg" mb={4} className="text-gray-800 dark:text-white">History Manager</Heading>
      
      {history.length === 0 ? (
        <Text className="text-gray-600 dark:text-gray-400">No history entries yet.</Text>
      ) : (
        <VStack spacing={3} align="stretch" mb={4}>
          {history.map((entry) => (
            <HistoryEntryCard
              key={entry.timestamp}
              timestamp={entry.timestamp}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          ))}
        </VStack>
      )}

      {history.length > 0 && (
        <Flex justify="flex-end">
          <Button
            colorScheme="red"
            onClick={clearHistory}
            className="mt-4"
          >
            Clear All History
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default HistoryManager;
