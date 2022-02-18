import {
  FormControl,
  Input,
  VStack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sign } from "../components/Sign";
import { api } from "../services/api";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  async function handleSubmit() {
    const response = await api.post("/users", { name, email, password });

    if (response.status === 200) {
      const loginResponse = await api.post("/login", { email, password });
      if (loginResponse.status === 200) {
        navigate("/users", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
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

          <ChakraLink>
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
