import React from 'react';
import { Flex, Text, Spinner } from '@chakra-ui/react';
import { Converse } from '@/factories/converse/types/converse.type';

export const UserConverseBubble: React.FC<{ converse: Converse }> = ({ converse }) => {
    const backgroundColor = "blue.500";
    const textColor = "white";
    const alignSelf = "flex-end";

    return (
        <Flex alignSelf={alignSelf} maxWidth="70%" p={3} borderRadius="lg" bg={backgroundColor} m={1}>
            {!converse.text ? (
                <Spinner size="sm" color={textColor} />
            ) : (
                <Text color={textColor}>{converse.text}</Text>
            )}
        </Flex>
    );
};