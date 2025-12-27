import {
    Box,
    Stack,
    Heading,
    Text,
    ProgressCircle,
    ProgressCircleLabel,
    List,
    ListItem,
    SimpleGrid,
    EmptyState,
    VStack,
    Flex,
    Button
} from "@chakra-ui/react";
import { useRef } from "react";
import { CircleProgress } from "./circleProgress";
import KeywordBlock from "./keywordBlock";
import ReactMarkdown from "react-markdown";
import { useReactToPrint } from "react-to-print";
import { useResumeAnalysisStore } from "@/stores/useResumeAnalysisStore";
import Analysis from "./icons/analysis.icon";
import { getTimeStamp, getDateString } from "@/helpers/date.helper";
import Printer from "./icons/printer.icon";

export const ResumeMatchViewer = () => {
    const { analysisResult } = useResumeAnalysisStore();
    const printRef = useRef<HTMLDivElement>(null);
    const candidateName = analysisResult?.name || '';
    const appliedPosition = analysisResult?.position || '';
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        pageStyle: `@page { 
                    size: A4 portrait; 
                    margin: 10mm; 
                    }
                    @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        padding: 40px !important;
                    }
                    }`,
        documentTitle: `Resume_Analysis_Report${candidateName ? `_${candidateName}` : ''}${appliedPosition? `_${appliedPosition}`:''}_${getTimeStamp()}`
    })
    return (
        <Flex align="center" justify="center" padding="5vw" direction="column" w="100vw">
            {analysisResult ? (
                <Stack ref={printRef} padding={"5vw"}>
                    <Flex w={"full"} h={"auto"} align={"center"} justify={"space-between"} direction={"row"}>
                        <Box textAlign="center">
                            <CircleProgress value={analysisResult.overall_match_percentage} />
                        </Box>
                        <Box textAlign={"right"}>
                            <Heading size={"4xl"} color={"teal.800"}>
                                {candidateName}
                            </Heading>
                            <Text fontSize={"md"}>
                                {appliedPosition}
                            </Text>
                            <Text fontSize={"md"}>
                                {getDateString()}
                            </Text>
                        </Box>
                    </Flex>
                    <hr />
                    <Stack>
                        {analysisResult.field_matches.map((field, index) => (
                            <Stack
                                key={index}
                                direction={{ base: "column", md: "row" }}
                                align="flex-start"
                            >
                                <ProgressCircle.Root
                                    value={field.match_percentage}
                                    size="md"
                                    color="blue.400">
                                    <ProgressCircle.Circle>
                                        <ProgressCircle.Track />
                                        <ProgressCircle.Range />
                                    </ProgressCircle.Circle>
                                    <ProgressCircleLabel fontWeight="bold">
                                        {field.match_percentage}%
                                    </ProgressCircleLabel>
                                </ProgressCircle.Root>

                                <Stack flex={1}>
                                    <Heading size="md">{field.field}</Heading>

                                    <Text color="gray.600">{field.feedback}</Text>
                                    <SimpleGrid columns={{ base: 1, md: 3 }}>
                                        <KeywordBlock
                                            title="Matched"
                                            colorScheme="green"
                                            items={field.matched_keywords}
                                        />
                                        <KeywordBlock
                                            title="Missing"
                                            colorScheme="red"
                                            items={field.missing_keywords}
                                        />
                                        <KeywordBlock
                                            title="Unused"
                                            colorScheme="gray"
                                            items={field.unused_keywords}
                                        />
                                    </SimpleGrid>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                    <hr />
                    <Box>
                        <Heading size="md" mb={4}>
                            Highly Recommended
                        </Heading>
                        <List.Root pl={6}>
                            {analysisResult.action_items.map((item, index) => (
                                <ListItem key={index}>
                                    <ReactMarkdown>{item}</ReactMarkdown>
                                </ListItem>
                            ))}
                        </List.Root>
                    </Box>
                    <hr />
                    <Box>
                        <Heading size="md" mb={4}>
                            General Feedback
                        </Heading>
                        <Box
                            p={4}
                            bg="none"
                        >
                            <ReactMarkdown>{analysisResult.general_feedback}</ReactMarkdown>
                        </Box>
                    </Box>
                </Stack>
            )
                :
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <Analysis />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>No Analysis Available</EmptyState.Title>
                            <EmptyState.Description>
                                Please analyze a resume to see the results.
                            </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            }
            {analysisResult &&
                <Button w={"100px"} h={"30px"} rounded="30px" onClick={handlePrint}>
                    <Printer />Print
                </Button>
            }
        </Flex>
    );
};



