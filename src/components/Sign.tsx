import { Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { HiUserAdd } from "react-icons/hi";

interface SignProps {
  title: string;
  children: ReactElement;
  handleSubmit: () => void;
}

export function Sign({ title, children, handleSubmit }: SignProps) {
  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <VStack borderRadius="3xl" w={["90vw", "25vw"]} h={["90vh", "70vh"]}>
        <Flex
          direction="column"
          borderRadius="3xl"
          w="100%"
          h="87%"
          justify="center"
          align="center"
          backgroundColor="#a645ad60"
        >
          <Icon as={HiUserAdd} w="35%" h="25%" mb="3vh" />
          <Text fontWeight="700" fontSize={["1rem", "1.75rem"]}>
            {title}
          </Text>
          {children}
        </Flex>
        <Button
          w="80%"
          h={["10%", "12%"]}
          borderRadius="3xl"
          fontWeight="700"
          fontSize={["1rem", "1.75rem"]}
          backgroundColor="#a645ad60"
          onClick={handleSubmit}
        >
          Próximo
        </Button>
      </VStack>
    </Flex>
  );
}
