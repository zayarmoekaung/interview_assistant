import { useModeStore } from "@/stores/useModeStore";
import { Modes } from "@/types/mode.type";
import { ResumeMatchViewer } from "./resumeMatchResponse";
import { InterviewConversationViewer } from "./interviewconversation";
import { AnimatePresence } from "framer-motion"
import { MotionFlex } from "@/components/animations"

export const MainView = () => {
    const { globalMode } = useModeStore()

    return (
        <AnimatePresence mode="wait">
            {globalMode === Modes.ANALYSIS && (
                <MotionFlex
                    key={Modes.ANALYSIS}
                    w={"100vw"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ResumeMatchViewer />
                </MotionFlex>
            )}

            {globalMode === Modes.INTERVIEW && (
                <MotionFlex
                    key={Modes.INTERVIEW}
                    w={"100vw"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <InterviewConversationViewer />
                </MotionFlex>
            )}
        </AnimatePresence>
    )
}