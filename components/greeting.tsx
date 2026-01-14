'use client';

import React from 'react';
import {
    VStack,
    Avatar,
    Text,
    Button,
} from '@chakra-ui/react';

interface ChatGreetingProps {
    avatarSrc?: string;
    greetingText?: string;
    buttonText?: string;
    onButtonClick: () => void;
}

const ChatGreeting: React.FC<ChatGreetingProps> = ({
    avatarSrc = 'https://example.com/bot-avatar.jpg',
    greetingText = 'Hello! How can I help you today?',
    buttonText = 'Start Chat',
    onButtonClick,
}) => {
    return (
        <VStack
            align="center"
            justify="center"
            h="full"
            w="full"
            p={6}
        >
            <Avatar.Root size={"2xl"}>
                <Avatar.Fallback name="Mafuyu Sensei" />
                <Avatar.Image src={avatarSrc} />
            </Avatar.Root>
            <Text fontSize="md" textAlign="left">
                {greetingText}
            </Text>
            <Button
                colorScheme="blue"
                bg="blue.500"
                color="white"
                onClick={onButtonClick}
                rounded={"30px"}
            >
                {buttonText}
            </Button>
        </VStack>
    );
};

export default ChatGreeting;