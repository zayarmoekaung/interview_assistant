'use client';

import React, { useState } from 'react';
import { playAudioFromBlob } from '@/helpers/audio/audio.helper';
import { generateGreetingAudio } from '@/helpers/conversation/conversation.helper';
import { createMessage } from '@/helpers/message/message.helper';
import { Status } from '@/factories/message';
import {
    VStack,
    Avatar,
    Text,
    Flex,
    Spinner,
    Button,
} from '@chakra-ui/react';
import { FaVolumeUp } from 'react-icons/fa';
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
    const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
    const handleGenerateSpeech = async () =>{
         if (!greetingText) return;
                setIsGeneratingSpeech(true);
                try {
                    const audioBlob = await generateGreetingAudio();
                    if(audioBlob){
                        await playAudioFromBlob(audioBlob);
                    }
                } catch (error) {
                    console.error("Error generating speech:", error);
                    createMessage(Status.ERROR, "Error generating speech:", error instanceof Error ? error.message : String(error))
                } finally {
                    setIsGeneratingSpeech(false);
                }
    }
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
            <Flex alignSelf="flex-start" mt={1} ml={2}>
                            {isGeneratingSpeech ?
                                <Spinner></Spinner>
                                :
                                <Button
                                    size="sm"
                                    onClick={handleGenerateSpeech}
                                    variant="ghost"
                                    colorScheme="gray"
                                    color="gray.500"
                                >
                                    <FaVolumeUp />
                                </Button>
                            }
                        </Flex>
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