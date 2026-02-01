import React, { useState, useEffect } from 'react';
import { Flex, Text, Spinner, Button } from '@chakra-ui/react';
import { FaVolumeUp } from 'react-icons/fa';
import { Converse } from '@/factories/converse/types/converse.type';
import { generateInterviewQuestion } from '@/services/mockInterview.service';
import { ConversationStore } from '@/stores/useConversationStore';
import { createMessage } from '@/helpers/message/message.helper';
import { Status } from '@/factories/message';

export const AiConverseBubble: React.FC<{ converse: Converse }> = ({ converse }) => {
    const [localText, setLocalText] = useState(converse.text);
    const [localIsLoading, setLocalIsLoading] = useState(false);
    const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
    const toogleLoading = ConversationStore().toogleLoading;
    const updateConverseText = ConversationStore().updateConverseText;

    useEffect(() => {
        if (converse.note && !converse.text && !localIsLoading) {
            setLocalIsLoading(true);
            toogleLoading();
            generateInterviewQuestion(converse.note)
                .then((interviewQuestion) => {
                    if (interviewQuestion) {
                        const formattedText = `${interviewQuestion.question}\n\n${interviewQuestion.probes.join("\n")}`;
                        setLocalText(formattedText);
                        updateConverseText(converse.id, formattedText);
                        handleGenerateSpeech();
                    } else {
                        const errorText = "Failed to generate question: No content received.";
                        setLocalText(errorText);
                        updateConverseText(converse.id, errorText);
                    }
                })
                .catch((error) => {
                    console.error("Error generating interview question:", error);
                    createMessage(Status.ERROR, "Error generating interview question:", error instanceof Error ? error.message : String(error))
                    const errorText = "Error generating question. Please try again.";
                    setLocalText(errorText);
                    updateConverseText(converse.id, errorText);
                })
                .finally(() => {
                    setLocalIsLoading(false);
                    toogleLoading;
                });
        }
    }, [converse, localIsLoading,toogleLoading,updateConverseText]);

    const handleGenerateSpeech = async () => {
        if (!localText) return;
        setIsGeneratingSpeech(true);
        try {
            if (converse.playAudio) {
                await converse.playAudio();
            }
        } catch (error) {
            console.error("Error generating speech:", error);
            createMessage(Status.ERROR, "Error generating speech:", error instanceof Error ? error.message : String(error))
        } finally {
            setIsGeneratingSpeech(false);
        }
    };

    const backgroundColor = "gray.700";
    const textColor = "white";
    const alignSelf = "flex-start";

    return (
        <Flex direction="column" alignSelf={alignSelf} maxWidth="70%" m={1}>
            <Flex p={3} borderRadius="lg" bg={backgroundColor}>
                {localIsLoading ? (
                    <Spinner size="sm" color={textColor} />
                ) : (
                    <Text color={textColor}>{localText}</Text>
                )}
            </Flex>
            <Flex alignSelf="flex-start" mt={1} ml={2}>
                {isGeneratingSpeech ?
                    <Spinner></Spinner>
                    :
                    <Button
                        size="sm"
                        onClick={handleGenerateSpeech}
                        disabled={localIsLoading}
                        variant="ghost"
                        colorScheme="gray"
                        color="gray.500"
                    >
                        <FaVolumeUp />
                    </Button>
                }
            </Flex>
        </Flex>
    );
};