import { Box, Badge, Text, Stack } from "@chakra-ui/react";
import { KeywordBlockProps } from "@/types/keyWordBlock.type";

const KeywordBlock: React.FC<KeywordBlockProps> = ({
  title,
  items,
  colorScheme,
}) => {
  return (
    <Box>
      <Text fontWeight="semibold" mb={2}>
        {title}
      </Text>
      <Stack direction="row" wrap="wrap">
        {items.length === 0 && (
          <Text fontSize="sm" color="gray.400">
            None
          </Text>
        )}
        {items.map((item, index) => (
          <Badge
            key={index}
            colorScheme={colorScheme}
            mr={1}
            mb={1}
          >
            {item}
          </Badge>
        ))}
      </Stack>
    </Box>
  );
};
export default KeywordBlock;