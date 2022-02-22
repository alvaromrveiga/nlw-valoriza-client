import { Box, Flex, Text } from "@chakra-ui/react";

interface InfoPanelProps {
  title: string;
  backgroundColor: string;
  children?: React.ReactElement;
}

export function InfoPanel({
  title,
  backgroundColor,
  children,
}: InfoPanelProps) {
  return (
    <Flex
      direction="column"
      h="50%"
      w="100%"
      justify="start"
      align="center"
      mt="5vh"
    >
      <Flex h="20%" align="center">
        <Text
          textAlign="center"
          fontWeight="600"
          fontSize={["0.75rem", "1.25rem"]}
        >
          {title}
        </Text>
      </Flex>

      <Box w="90%" h="70%" borderRadius="3xl" backgroundColor={backgroundColor}>
        {children}
      </Box>
    </Flex>
  );
}
