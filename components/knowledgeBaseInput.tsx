import { useRef } from "react";
import { Button, Card, Field, Stack,Textarea} from "@chakra-ui/react"
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { useModelStore } from "@/stores/useModelStore";
export const KnowledgeBaseInput = () => {
    const setJdText = useKnowledgeBaseStore((state) => state.setJDText);
    const setResumeText = useKnowledgeBaseStore((state) => state.setResumeText);
    const selectedModel = useModelStore((state) => state.selectedModel);
    const jdRef = useRef<HTMLTextAreaElement>(null);
    const resumeRef = useRef<HTMLTextAreaElement>(null);
    const handleSave = () => {
        if (jdRef.current) {
            setJdText(jdRef.current.value);
        }
        if (resumeRef.current) {
            setResumeText(resumeRef.current.value);
        }
    }
    const isValid = () => {
        return jdRef.current?.value.trim().length! > 0 && resumeRef.current?.value.trim().length! > 0;
    }
    return (
        <div className="flex items-center justify-center z-500  backdrop-blur-sm backdrop-brightness-75 fixed top-0 left-0 w-full h-full background-black overflow-auto">
            <Card.Root w="xl" height="auto" boxShadow="lg">
                <Card.Header>
                    <Card.Title>Insert Data</Card.Title>
                    <Card.Description>
                        Fill in the details below to proceed.
                    </Card.Description>
                </Card.Header>
                <Card.Body w="full" height="auto" scrollBehavior={"smooth"}>
                    <Stack gap="4" w="full">
                        <Field.Root>
                            <Field.Label>Job Description</Field.Label>
                            <Textarea size={'lg'} ref={jdRef} />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Resume</Field.Label>
                            <Textarea size={'lg'} ref={resumeRef} />
                        </Field.Root>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button variant="solid" onClick={handleSave} disabled={!isValid()}>Save</Button>
                </Card.Footer>
            </Card.Root>
        </div>
    );
};