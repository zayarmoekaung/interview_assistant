import { AiConverseBubble } from "./AIConverseBubble";
import { Converse } from '@/factories/converse/types/converse.type';

export const ConverseBubble : React.FC<{ converse: Converse }> = ({ converse }) => {
    if (!converse.isOutgoing) {
        return (
            <AiConverseBubble converse={converse} />
        ) 
    }
}