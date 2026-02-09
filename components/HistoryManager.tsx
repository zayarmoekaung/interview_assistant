import React from 'react';
import { Box, Button, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { useHistoryStore } from '../stores/historyStore';
import HistoryEntryCard from './HistoryEntryCard';
import { restoreHistory } from '../helpers/historyHelpers';


const HistoryManager: React.FC = () => {
  const { history, clearHistory } = useHistoryStore();

  const handleDelete = (timestampToDelete: number) => {
    useHistoryStore.setState((state) => ({
      history: state.history.filter(entry => entry.timestamp !== timestampToDelete)
    }));
  };

  const handleRestore = (timestampToRestore: number) => {
    restoreHistory(timestampToRestore);
  };

  return (
    <Box p={5} className="w-full max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl">
      <Heading as="h2" size="lg" mb={4} className="text-gray-800 dark:text-white">History Manager</Heading>
      
      {history.length === 0 ? (
        <Text className="text-gray-600 dark:text-gray-400">No history entries yet.</Text>
      ) : (
        <VStack align="stretch" mb={4}>
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
