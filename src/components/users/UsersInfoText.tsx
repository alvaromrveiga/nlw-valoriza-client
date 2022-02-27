import { Text } from "@chakra-ui/react";

interface UsersInfoTextProps {
  children: React.ReactNode;
}

export function UsersInfoText({ children }: UsersInfoTextProps) {
  return (
    <Text
      w="100%"
      fontWeight="400"
      fontSize={["0.5rem", "0.675rem", "1rem"]}
      pt={["1vh", "1vh"]}
      pb={["2vh", "1vh"]}
      paddingX={["2vw", "2vw", "1.5vw"]}
    >
      {children}
    </Text>
  );
}
