import { useModeStore } from "@/stores/useModeStore";
import { generateAnalysis } from "@/services/generateAnalysis.service";
import { Modes } from "@/types/mode.type";
import { Flex, Button } from "@chakra-ui/react";
import { MotionFlex } from "../animations";
import { AnimatePresence } from "framer-motion"
import { Tooltip } from "@/components/ui/tooltip";
import Analysis from "../icons/analysis.icon";
export const AnalysisMode = () => {
    const { globalMode, switchMode } = useModeStore()
    const handleModeSwitch = () => {
        switchMode(Modes.ANALYSIS)
    }
    return (
        <MotionFlex
            layout="size"
            align="center"
            justify="center"
            overflow="hidden"
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                },
            }}
        >
            {globalMode !== Modes.ANALYSIS ? (
                <MotionFlex
                    key="icon-button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <Tooltip content="Switch To Analysis Mode">
                        <Button
                            w="30px"
                            h="30px"
                            rounded="20px"
                            onClick={handleModeSwitch}
                        >
                            <Analysis />
                        </Button>
                    </Tooltip>
                </MotionFlex>
            ) : (
                <MotionFlex
                    key="analyze-button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <Button
                        w="100px"
                        h="30px"
                        rounded="30px"
                        onClick={generateAnalysis}
                    >
                        Analyze
                    </Button>
                </MotionFlex>
            )}
        </MotionFlex>
    )
}