'use client';

import React from 'react';
import {
    Box,
    Flex,
    Text,
    VStack,
    Avatar,
} from '@chakra-ui/react';

interface Message {
    id: string;
    text: string;
    isOutgoing: boolean;
    timestamp?: string;
}

interface ChatUIProps {
    messages: Message[];
    emptyStateText?: string;
    userAvatar?: string;
    otherAvatar?: string;
}

const ConversationUI: React.FC<ChatUIProps> = ({
    messages,
    emptyStateText = 'No messages yet. Start the conversation!',
    userAvatar,
    otherAvatar,
}) => {
    const bgColor = 'gray.50';
    const incomingBg = 'white';
    const outgoingBg = 'blue.500';
    const textColor = 'black';
    const outgoingTextColor = 'white';


    if (messages.length === 0) {
        return (
            <Flex
                h="full"
                w="full"
                align="center"
                justify="center"
                bg={bgColor}
                borderRadius="md"
                boxShadow="md"
                p={4}
            >
                <Text color="gray.500">{emptyStateText}</Text>
            </Flex>
        );
    }

    return (
        <VStack
            align="stretch"
            h="full"
            w="full"
            overflowY="auto"
            bg={bgColor}
            borderRadius="md"
            boxShadow="md"
            p={4}
        >
            {messages.map((msg) => (
                <Flex
                    key={msg.id}
                    justify={msg.isOutgoing ? 'flex-end' : 'flex-start'}
                    align="flex-start"
                    w="full"
                >
                    {!msg.isOutgoing && (
    
                        <Avatar.Root>
                            <Avatar.Fallback name="Segun Adebayo" />
                            <Avatar.Image src={otherAvatar} />
                        </Avatar.Root>
                    )}
                    <Box
                        maxW="70%"
                        bg={msg.isOutgoing ? outgoingBg : incomingBg}
                        color={msg.isOutgoing ? outgoingTextColor : textColor}
                        borderRadius="lg"
                        px={4}
                        py={2}
                    >
                        <Text>{msg.text}</Text>
                        {msg.timestamp && (
                            <Text fontSize="xs" color={msg.isOutgoing ? 'blue.200' : 'gray.500'} mt={1}>
                                {msg.timestamp}
                            </Text>
                        )}
                    </Box>
                    {msg.isOutgoing && (
                        <Avatar.Root>
                            <Avatar.Fallback name="You" />
                            <Avatar.Image src={userAvatar} />
                        </Avatar.Root>
                    )}
                </Flex>
            ))}
        </VStack>
    );
};

export default ConversationUI;