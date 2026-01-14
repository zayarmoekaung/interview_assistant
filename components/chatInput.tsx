"use client";

import {
    Box,
    HStack,
    Textarea,
    Button,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const maxHeight = 160; // px

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
        el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [value]);

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value.trim());
        setValue("");
    };

    return (
        <Box
            position="relative"
            height="72px"
            width="50vw"
        >
            <Box
                p={3}
                bg={"none"}
                rounded={"20px"}
                bottom={"5px"}
                left={"5px"}
                position={"absolute"}
            >
                <HStack align="flex-end" >
                    <Textarea
                        ref={textareaRef}
                        value={value}
                        rounded={"30px"}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Type a message..."
                        resize="none"
                        rows={1}
                        maxH={`${maxHeight}px`}
                        w={"50vw"}
                        overflowY="hidden"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />

                    <Button
                        aria-label="Send message"
                        onClick={handleSend}
                        disabled={!value.trim()}
                        colorScheme="teal"
                    >Send</Button>

                    <Button
                        aria-label="Options"
                        variant="ghost"
                    />
                </HStack>
            </Box>
        </Box>
    );
};
