import React from 'react';
import { Box, Button, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { MdAutoDelete, MdRestartAlt } from "react-icons/md";
import { Tooltip } from './ui/tooltip';
import { useHistoryStore } from '../stores/historyStore';
import HistoryEntryCard from './HistoryEntryCard';
import { restoreHistory, createSnapShot, saveAndClearStores, deleteHistory } from '../helpers/historyHelpers';
import { createMessage } from '@/helpers/message/message.helper';
import { Status } from '@/factories/message';

const HistoryManager: React.FC = () => {
  const { history, clearHistory } = useHistoryStore();

  const handleDelete = (timestampToDelete: number) => {
    deleteHistory(timestampToDelete);
  };

  const handleRestore = (timestampToRestore: number) => {
    restoreHistory(timestampToRestore);
  };
  const handleNewSession = () => {
    try {
      const stateSnapShot = createSnapShot();
      saveAndClearStores(stateSnapShot);
    } catch (error) {
      createMessage(Status.ERROR, "Error Clearing Session", "")
    }
  }
  return (
    <Box p={5} h={"100%"} className="w-full max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl">
      <Heading as="h2" size="lg" mb={4} className="text-gray-800 dark:text-white">Session History</Heading>
      {Object.keys(history).length === 0 ? (
        <Text className="text-gray-600 dark:text-gray-400">No history entries yet.</Text>
      ) : (
        <VStack align="stretch" h={"80%"} mb={4}>
          {Object.values(history).map((entry) => (
            <HistoryEntryCard
              key={entry.timestamp}
              timestamp={entry.timestamp}
              onRestore={handleRestore}
              onDelete={handleDelete}
            />
          ))}
        </VStack>
      )}
      <Flex justify="flex-start" gap={"5px"}>
        <Tooltip content="Save Changes and Start a New Session">
          <Button
            colorScheme="red"
            width={"20px"}
            height={"20px"}
            rounded={"20px"}
            onClick={handleNewSession}
          >
            <MdRestartAlt />
          </Button>
        </Tooltip>
        {Object.keys(history).length > 0 && (
          <Tooltip content="Clear All Session History">
            <Button
              colorScheme="red"
              width={"20px"}
              height={"20px"}
              rounded={"20px"}
              onClick={clearHistory}
            >
              <MdAutoDelete />
            </Button>
          </Tooltip>
        )}
      </Flex>
    </Box>
  );
};

export default HistoryManager;
