import {
  FormControl,
  Input,
  VStack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";
import { Sign } from "../components/Sign";
import { api } from "../services/api";
import { login } from "../utils/login";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  async function handleSubmit() {
    const response = await api.post("/users", { name, email, password });

    if (response.status === 200) {
      await login({ email, password, navigate });
    }
  }

  return (
    <Sign icon={HiUserAdd} title="Cadastro" handleSubmit={() => handleSubmit()}>
      <FormControl isRequired>
        <VStack spacing="3vh">
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

          <ChakraLink as="span">
            <Link to="/">
              <Text fontWeight="400" fontSize="0.75rem">
                Voltar para o Login
              </Text>
            </Link>
          </ChakraLink>
        </VStack>
      </FormControl>
    </Sign>
  );
}
