import React, { useState, useEffect } from 'react';
import { Flex, Text, Box, Spinner } from '@chakra-ui/react';
import { Converse } from '@/factories/converse/types/converse.type';
import { generateInterviewQuestion } from '@/services/mockInterview.service';

export const ConverseBubble: React.FC<{ converse: Converse }> = ({ converse }) => {
    const [localText, setLocalText] = useState(converse.text);
    const [localIsLoading, setLocalIsLoading] = useState(true);

    useEffect(() => {
        if (converse.note && localIsLoading && !converse.text) {
            generateInterviewQuestion(converse.note).then((interviewQuestion) => {
                if (interviewQuestion) {
                    const formattedText = `${interviewQuestion.question}\n\nProbes:\n${interviewQuestion.probes.join("\n")}`;
                    setLocalText(formattedText);
                    setLocalIsLoading(false);
                    converse.text = formattedText;
                }
            });
        }
    }, [converse, localIsLoading]);
    const backgroundColor = converse.isOutgoing ? "blue.500" : "gray.700";
    const textColor = "white";
    const alignSelf = converse.isOutgoing ? "flex-end" : "flex-start";

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