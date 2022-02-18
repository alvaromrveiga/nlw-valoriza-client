import {
  FormControl,
  Input,
  VStack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { setCookie } from "nookies";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sign } from "../components/Sign";
import { api } from "../services/api";
import { login } from "../utils/login";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  async function handleSubmit() {
    await login({ email, password, navigate });
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

          <ChakraLink>
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
