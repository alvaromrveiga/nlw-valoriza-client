import { FormControl, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Sign } from "../components/Sign";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log(email, password);
  }

  return (
    <Sign title="Login" handleSubmit={() => handleSubmit()}>
      <FormControl isRequired>
        <VStack spacing="3vh" mb="7vh">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            w="70%"
            variant="filled"
            size="sm"
            id="email"
            type="email"
            placeholder="E-mail"
            _placeholder={{ color: "gray.600" }}
            mt="2vh"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            w="70%"
            variant="filled"
            size="sm"
            id="password"
            type="password"
            placeholder="Senha"
            _placeholder={{ color: "gray.600" }}
          />
        </VStack>
      </FormControl>
    </Sign>
  );
}
