import React from 'react';
import { Flex, Text, Box, Spinner } from '@chakra-ui/react';
import { ConversationStore } from '@/stores/useConversationStore';
import { ConverseBubble } from './ConverseBubble';

export const ConversationBubbles: React.FC = () => {
    const conversation = ConversationStore((state) => state.conversation);

    return (
        <>
        <Flex direction="column" w="full" p={4}>
            {conversation.map((converse) => (
                <ConverseBubble key={converse.id} converse={converse} />
            ))}
        </Flex>
        </>
    );
};
