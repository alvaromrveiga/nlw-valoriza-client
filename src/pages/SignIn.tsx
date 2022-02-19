import {
  FormControl,
  Input,
  Link as ChakraLink,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sign } from "../components/Sign";
import { login } from "../utils/login";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit() {
    await login({ email, password, navigate }).catch(() => {
      toast({
        title: "Erro de login",
        description:
          "E-mail ou senha incorretos, verifique suas credenciais e tente novamente",
        status: "error",
        isClosable: true,
      });
    });
  }

  return (
    <Sign title="Login" handleSubmit={() => handleSubmit()}>
      <FormControl isRequired>
        <VStack spacing="3vh">
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

          <ChakraLink as="span">
            <Link to="/signup">
              <Text fontWeight="400" fontSize="0.75rem">
                Não tem uma conta? Cadastre-se
              </Text>
            </Link>
          </ChakraLink>
        </VStack>
      </FormControl>
    </Sign>
  );
}
