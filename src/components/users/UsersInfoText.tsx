import { Text } from "@chakra-ui/react";

interface UsersInfoTextProps {
  children: React.ReactNode;
}

export function UsersInfoText({ children }: UsersInfoTextProps) {
  return (
    <Text
      w="100%"
      fontWeight="400"
      fontSize={["0.5rem", "1rem"]}
      paddingY="1vh"
      paddingX="1vw"
    >
      {children}
    </Text>
  );
}
