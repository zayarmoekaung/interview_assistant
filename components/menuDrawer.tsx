import { IconButton, Button, CloseButton, Drawer, Portal, Flex, Textarea, Field } from "@chakra-ui/react";
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useVersionStore } from "@/stores/useVersionStore";
import Humberger from "./icons/humberger.icon";
import { useRef } from "react";
export const MenuDrawer = () => {
    const { jdText, resumeText, setJDText, setResumeText } = useKnowledgeBaseStore();
    const { kb_version } = useVersionStore();
    const jdRef = useRef<HTMLTextAreaElement>(null);
    const resumeRef = useRef<HTMLTextAreaElement>(null);
    const handleSave = () => {
        if (jdRef.current) {
            setJDText(jdRef.current.value);
        }
        if (resumeRef.current) {
            setResumeText(resumeRef.current.value);
        }
    }
    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <IconButton rounded="full" scale={1} h="40px" w="40px" aria-label="Menu Button" variant="ghost" color="white" _hover={{ bg: "gray.700" }}>
                   <Humberger/>
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop zIndex={50}/>
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Data Set</Drawer.Title>
                            <i>kb version - { kb_version }</i>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Flex direction="column" gap="4" marginBottom="10px">
                                <Field.Root>
                                    <Field.Label>Job Description</Field.Label>
                                    <Textarea size={'md'} minH="30vh" h="auto" ref={jdRef} defaultValue={jdText} placeholder="Job Description" />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Resume</Field.Label>
                                    <Textarea size={'md'} minH="30vh" h="auto" ref={resumeRef} defaultValue={resumeText} placeholder="Resume" />
                                </Field.Root>
                            </Flex>
                            <hr />
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button variant="solid" onClick={handleSave} >Save</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}