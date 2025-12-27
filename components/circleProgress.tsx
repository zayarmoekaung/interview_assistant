import { Box, Text } from "@chakra-ui/react";
import Cycle from "./icons/cycle.icon";
interface CircleProgressProps {
  value: number; 
  size?: number;
  strokeWidth?: number;
}

export function CircleProgress({
  value,
  size = 180,
  strokeWidth = 14,
}: CircleProgressProps) {
  
  return (
    <Box position="relative" width={size} height={size}>
      <Cycle size={size} strokeWidth={strokeWidth} value={value} />
      <Box
        position="absolute"
        inset="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text fontSize="sm" color="gray.500">
          Overall Match
        </Text>
        <Text fontSize="4xl" fontWeight="bold">
          {value}%
        </Text>
      </Box>
    </Box>
  );
}
