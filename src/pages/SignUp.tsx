import { FormControl, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Sign } from "../components/Sign";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log(name, email, password);
  }

  return (
    <Sign title="Cadastro" handleSubmit={() => handleSubmit()}>
      <FormControl isRequired>
        <VStack spacing="3vh" mb="7vh">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            w="70%"
            variant="filled"
            size="sm"
            id="name"
            type="name"
            placeholder="Nome"
            _placeholder={{ color: "gray.600" }}
            mt="2vh"
          />

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
