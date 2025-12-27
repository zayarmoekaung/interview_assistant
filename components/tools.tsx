import { generateAnalysis } from "@/services/generateAnalysis.service";
import { ModelSelector } from "./modelSelector";
import { Flex,Button } from "@chakra-ui/react";
export const Tools = () => {
    return (
        <Flex align="center" justify="center" gap="10px" position="fixed" bottom="10px" left="0px" direction="row" zIndex={50} w="100vw">
            <ModelSelector/>
            <Button w="100px" h="30px" rounded="30px" onClick={generateAnalysis}>Analyze</Button>
        </Flex>
    )
}