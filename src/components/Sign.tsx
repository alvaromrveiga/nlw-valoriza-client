import { Button, Flex, Icon, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { SubmitHandler } from "react-hook-form";
import { IconType } from "react-icons";

interface SignProps {
  icon?: IconType;
  title: string;
  children: ReactElement;
  isLoading: boolean;
  handleSign: SubmitHandler<any>;
}

export function Sign({
  icon,
  title,
  children,
  isLoading,
  handleSign,
}: SignProps) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    handleSign("");
  }

  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <VStack
        borderRadius="3xl"
        w={["90vw", "25vw"]}
        h={["90vh", "70vh"]}
        as="form"
      >
        <Flex
          direction="column"
          borderRadius="3xl"
          w="100%"
          h="87%"
          justify="center"
          align="center"
          backgroundColor="#a645ad60"
        >
          {icon && <Icon as={icon} w="35%" h="25%" mb="3vh" />}

          <Text fontWeight="700" fontSize={["1rem", "1.75rem"]} pb="2vh">
            {title}
          </Text>
          {children}
        </Flex>
        <Button
          type="submit"
          w="80%"
          h={["10%", "12%"]}
          borderRadius="3xl"
          fontWeight="700"
          fontSize={["1rem", "1.75rem"]}
          backgroundColor="#a645ad60"
          onClick={handleSubmit}
        >
          {isLoading ? <Spinner /> : "Próximo"}
        </Button>
      </VStack>
    </Flex>
  );
}
