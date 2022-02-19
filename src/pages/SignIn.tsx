import { Link as ChakraLink, Text, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input } from "../components/Input";
import { Sign } from "../components/Sign";
import { login } from "../utils/login";

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

interface SignInFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const { register, handleSubmit, formState, trigger } =
    useForm<SignInFormData>({
      resolver: yupResolver(signInFormSchema),
    });

  let navigate = useNavigate();
  const toast = useToast();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await login({
      email: values.email,
      password: values.password,
      navigate,
    }).catch(() => {
      toast({
        title: "Erro de login",
        description:
          "E-mail ou senha incorretos, verifique suas credenciais e tente novamente",
        status: "error",
        isClosable: true,
      });
    });
  };

  return (
    <Sign
      title="Login"
      isLoading={formState.isSubmitting}
      handleSign={handleSubmit(handleSignIn)}
    >
      <VStack spacing="3vh" w="70%">
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
          <Link to="/signup">
            <Text fontWeight="400" fontSize="0.75rem">
              Não tem uma conta? Cadastre-se
            </Text>
          </Link>
        </ChakraLink>
      </VStack>
    </Sign>
  );
}
