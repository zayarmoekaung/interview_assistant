import { ModelSelector } from "./modelSelector";
import { InterviewMode } from "./tools/interviewMode";
import { AnalysisMode } from "./tools/analysisMode";
import { MotionFlex } from "@/components/animations";
import { AnimatePresence } from "framer-motion";
import { Modes } from "@/types/mode.type";
export const Tools = () => {
  return (
    <MotionFlex
      align="center"
      justify="center"
      gap="10px"
      position="fixed"
      bottom="10px"
      left="0px"
      direction="row"
      zIndex={50}
      w="100vw"
      layout="size"
      transition={{
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
      }}
    >
      <ModelSelector />
      <AnimatePresence mode="sync">
      <AnalysisMode key={Modes.ANALYSIS}/>
      <InterviewMode key={Modes.INTERVIEW}/>
      </AnimatePresence>
    </MotionFlex>
  )
}
