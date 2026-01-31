import React, { useState, useEffect } from 'react';
import { Flex, Text, Box, Spinner } from '@chakra-ui/react';
import { Converse } from '@/factories/converse/types/converse.type';
import { generateInterviewQuestion } from '@/services/mockInterview.service';
import { ConversationStore } from '@/stores/useConversationStore';
export const AiConverseBubble: React.FC<{ converse: Converse }> = ({ converse }) => {
    const [localText, setLocalText] = useState(converse.text);
    const [localIsLoading, setLocalIsLoading] = useState(false);
    const updateConverseText = ConversationStore().updateConverseText
    useEffect(() => {
        if (converse.note && !converse.text && !localIsLoading) {
            setLocalIsLoading(true);
            generateInterviewQuestion(converse.note)
                .then((interviewQuestion) => {
                    if (interviewQuestion) {
                        const formattedText = `${interviewQuestion.question}\n\nProbes:\n${interviewQuestion.probes.join("\n")}`;
                        setLocalText(formattedText);
                        updateConverseText(converse.id, formattedText);
                    } else {
                        const errorText = "Failed to generate question: No content received.";
                        setLocalText(errorText);
                        updateConverseText(converse.id, errorText);
                    }
                })
                .catch((error) => {
                    console.error("Error generating interview question:", error);
                    const errorText = "Error generating question. Please try again.";
                    setLocalText(errorText);
                    updateConverseText(converse.id, errorText);
                })
                .finally(() => {
                    setLocalIsLoading(false);
                });
        }
    }, [converse, localIsLoading, updateConverseText]);
    const backgroundColor = "gray.700";
    const textColor = "white";
    const alignSelf = "flex-start";

    return (
        <Flex alignSelf={alignSelf} maxWidth="70%" p={3} borderRadius="lg" bg={backgroundColor} m={1}>
            {localIsLoading ? (
                <Spinner size="sm" color={textColor} />
            ) : (
                <Text color={textColor}>{localText}</Text>
            )}
        </Flex>
    );
};