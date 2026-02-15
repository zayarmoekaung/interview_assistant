import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { TbRestore } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from './ui/tooltip';

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
      <Flex justify="space-between" align="flex-start" className="mb-2" direction="column" gap="5">
        <Text fontWeight="bold" className="text-gray-900 dark:text-white" fontSize={10}>
          {formattedDate}
        </Text>
        <Flex gap={"5px"}>
          <Tooltip content="Restore Session">
          <Button
            size="sm"
            width={"20px"}
            height={"20px"}
            rounded={"20px"}
            colorScheme="teal"
            onClick={() => onRestore(timestamp)}
          >
            <TbRestore/>
          </Button>
          </Tooltip>
           <Tooltip content="Delete Session">
          <Button
            size="sm"
            width={"20px"}
            height={"20px"}
            rounded={"20px"}
            colorScheme="red"
            onClick={() => onDelete(timestamp)}
          >
            <MdDeleteForever />
          </Button>
          </Tooltip>
        </Flex>
      </Flex>
      {/* You might want to display a summary of the state here later */}
    </Box>
  );
};

export default HistoryEntryCard;
