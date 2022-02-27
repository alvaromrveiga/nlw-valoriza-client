import { Button, Flex, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { SubmitHandler } from "react-hook-form";

interface SignProps {
  icon?: string;
  title: string;
  buttonText: string;
  children: ReactElement;
  isLoading: boolean;
  handleSign: SubmitHandler<any>;
}

export function Sign({
  icon,
  title,
  buttonText,
  children,
  isLoading,
  handleSign,
}: SignProps) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    handleSign("");
  }

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      backgroundImage="fundo.png"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      {icon && (
        <Image
          position="absolute"
          src={icon}
          w={{ base: "7rem", sm: "3.5rem", md: "7rem" }}
          h={{ base: "7rem", sm: "3.5rem", md: "7rem" }}
          top={{ base: "3vh", sm: "1vh", md: "6vh" }}
        />
      )}

      <VStack
        borderRadius="3xl"
        w={{ base: "90vw", md: "25vw" }}
        h={{ base: "90vh", md: "80vh" }}
        as="form"
      >
        <Flex
          direction="column"
          borderRadius="3xl"
          w="100%"
          h="87%"
          justify="center"
          align="center"
          backgroundColor="#dccae090"
        >
          <Text fontWeight="700" fontSize={["1.5rem", "1.75rem"]} pb="2vh">
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
          fontSize={["1.5rem", "1.75rem"]}
          backgroundColor="#dccae090"
          onClick={handleSubmit}
        >
          {isLoading ? <Spinner /> : buttonText}
        </Button>
      </VStack>
    </Flex>
  );
}
