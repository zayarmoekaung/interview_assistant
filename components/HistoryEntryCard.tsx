import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';

interface HistoryEntryCardProps {
  timestamp: number;
  onRestore: (timestamp: number) => void;
  onDelete: (timestamp: number) => void;
}

const HistoryEntryCard: React.FC<HistoryEntryCardProps> = ({
  timestamp,
  onRestore,
  onDelete,
}) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      shadow="md"
      className="bg-white dark:bg-gray-800 mb-2"
    >
      <Flex justify="space-between" align="center" className="mb-2">
        <Text fontWeight="bold" className="text-gray-900 dark:text-white">
          History: {formattedDate}
        </Text>
        <Flex>
          <Button
            size="sm"
            colorScheme="teal"
            onClick={() => onRestore(timestamp)}
            className="mr-2"
          >
            Restore
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => onDelete(timestamp)}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
      {/* You might want to display a summary of the state here later */}
    </Box>
  );
};

export default HistoryEntryCard;
