import { Stack, Alert,CloseButton } from "@chakra-ui/react"
import { useMessageStore } from "@/stores/useMessageStore"
export const MessageView = () => {
    const { messages, removeMessage } = useMessageStore()
    return (
        <Stack position={"fixed"} w={"auto"} h={"auto"} maxH={"40vh"} bottom={"0px"} right={"0px"} float={"right"} padding={"10px"} zIndex={50} scrollBehavior={"smooth"} overflow={"scroll"}>
            {messages.map((message) => (
                <Alert.Root status={message.status} key={message.index}>
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>{message.title}</Alert.Title>
                        <Alert.Description>
                            {message.message}
                        </Alert.Description>
                    </Alert.Content>
                    <CloseButton pos="relative" top="-2" insetEnd="-2" onClick={()=>removeMessage(message.index)}/>
                </Alert.Root>
            ))
            }
        </Stack>
    )
}