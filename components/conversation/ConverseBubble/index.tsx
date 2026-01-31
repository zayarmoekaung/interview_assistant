import { AiConverseBubble } from "./AIConverseBubble";
import { UserConverseBubble } from "./UserConverseBubble";
import { Converse } from '@/factories/converse/types/converse.type';
import { Flex, Text } from '@chakra-ui/react';
import { formatTimestamp } from '@/helpers/date.helper';

export const ConverseBubble: React.FC<{ converse: Converse }> = ({ converse }) => {
    const formattedTimestamp = formatTimestamp(converse.timestamp);

    return (
        <Flex direction="column" w="full">
            {formattedTimestamp && (
                <Text fontSize="xs" color="gray.500" alignSelf="center" mb={1}>
                    {formattedTimestamp}
                </Text>
            )}
            {converse.isOutgoing ? (
                <UserConverseBubble converse={converse} />
            ) : (
                <AiConverseBubble converse={converse} />
            )}
        </Flex>
    );
};