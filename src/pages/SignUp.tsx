import { Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiUserAdd } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input } from "../components/Input";
import { Sign } from "../components/Sign";
import { api } from "../services/api";
import { login } from "../utils/login";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export function SignUp() {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  });

  let navigate = useNavigate();

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    const { name, email, password } = values;

    const response = await api.post("/users", {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      await login({ email, password, navigate });
    }
  };

  return (
    <Sign
      icon={HiUserAdd}
      title="Cadastro"
      isLoading={formState.isSubmitting}
      handleSign={handleSubmit(handleSignUp)}
    >
      <VStack spacing="3vh" w="70%">
        <Input
          variant="filled"
          size="sm"
          id="name"
          type="name"
          placeholder="Nome"
          _placeholder={{ color: "gray.600" }}
          error={formState.errors.name}
          {...register("name")}
        />

        <Input
          variant="filled"
          size="sm"
          id="email"
          type="email"
          placeholder="E-mail"
          _placeholder={{ color: "gray.600" }}
          error={formState.errors.email}
          {...register("email")}
        />

        <Input
          variant="filled"
          size="sm"
          id="password"
          type="password"
          placeholder="Senha"
          _placeholder={{ color: "gray.600" }}
          error={formState.errors.password}
          {...register("password")}
        />

        <ChakraLink as="span">
          <Link to="/">
            <Text fontWeight="400" fontSize="0.75rem">
              Voltar para o Login
            </Text>
          </Link>
        </ChakraLink>
      </VStack>
    </Sign>
  );
}
