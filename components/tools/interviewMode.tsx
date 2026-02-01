import { useModeStore } from "@/stores/useModeStore";
import { useMockInterviewStore } from "@/stores/useMockInterviewStore";
import { generateGreeting } from "@/services/mockInterview.service";
import { addReply } from "@/helpers/conversation/conversation.helper";
import { isUptodate } from "@/helpers/kb_version.helper";
import { Modes } from "@/types/mode.type";
import { Button, Box } from "@chakra-ui/react";
import { MotionFlex } from "../animations";
import { Tooltip } from "@/components/ui/tooltip"
import { ChatInput } from "../chatInput";
import { NewSession } from "../newSession";
import Chat from "../icons/chat.icon";
export const InterviewMode = () => {
    const { globalMode, switchMode } = useModeStore()
    const { greeting } = useMockInterviewStore();
    const handleModeSwitch = () => {
        switchMode(Modes.INTERVIEW)
        if (!greeting || !isUptodate(greeting.kb_version)) {
            generateGreeting();
        }
    }
    const handleSend = (message: string) => {
        addReply(message,true);
    }
    return (
        <MotionFlex
            layout="size"
            align="center"
            justify="center"

            direction={"row"}
            position={"relative"}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                },
            }}
        >

            {globalMode !== Modes.INTERVIEW ?
                <MotionFlex
                    key="icon-button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <Tooltip content="Switch To Interview Mode">
                        <Button w={"30px"} h={"30px"} rounded={"30px"} onClick={handleModeSwitch}><Chat /></Button>
                    </Tooltip>
                </MotionFlex>
                :
                <>
                <NewSession/>
                <ChatInput onSend={handleSend} />
                </>
            }
        </MotionFlex>
    );
}