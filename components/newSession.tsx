import { Button } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import { ConversationStore } from "@/stores/useConversationStore";
import { useMockInterviewStore } from "@/stores/useMockInterviewStore"
import { ClearHistoryIcon } from "./icons/clear.icon";
export const NewSession = () => {
    const clearConversation = ConversationStore().clearConversation;
    const { setConversationStarted } = useMockInterviewStore.getState();

    const handleOnClick = () => {
        clearConversation();
        setConversationStarted(false);
    }
    return (
        <>
            <Tooltip content="Clear Conversation and Start New Session">
                <Button w={"30px"} h={"30px"} rounded={"30px"} onClick={handleOnClick}>
                    <ClearHistoryIcon />
                </Button>
            </Tooltip>
        </>
    )
}