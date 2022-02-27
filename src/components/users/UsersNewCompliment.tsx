import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services/api";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

const complimentFormSchema = yup.object().shape({
  user_receiver: yup
    .string()
    .required("ID do usuário obrigatório")
    .uuid("Id inválido"),
  tag_id: yup.string().required("ID da tag obrigatório").uuid("Id inválido"),
  message: yup.string().required("Mensagem obrigatória"),
});

interface ComplimentFormData {
  user_receiver: string;
  tag_id: string;
  message: string;
}

interface UsersNewComplimentProps {
  update: boolean;
  setUpdate: (update: boolean) => void;
  selectedUserId: string;
  selectedTagId: string;
}

export function UsersNewCompliment({
  update,
  setUpdate,
  selectedUserId,
  selectedTagId,
}: UsersNewComplimentProps) {
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<ComplimentFormData>({
      resolver: yupResolver(complimentFormSchema),
    });

  setValue("user_receiver", selectedUserId);
  setValue("tag_id", selectedTagId);

  const toast = useToast();

  const handleCreate: SubmitHandler<ComplimentFormData> = async (values) => {
    try {
      const { token } = parseCookies();
      const { user_receiver, tag_id, message } = values;

      const createComplimentResponse = await api.post(
        "/compliments",
        { user_receiver, tag_id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (createComplimentResponse.status === 200) {
        setUpdate(!update);

        toast({
          title: "Elogio enviado",
          status: "success",
          isClosable: true,
        });

        reset();
      } else {
        toast({
          title: "Erro ao criar elogio",
          description: "Por favor verifique os IDs utilizados",
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao criar elogio",
        description: "Por favor verifique os IDs utilizados",
        status: "error",
        isClosable: true,
      });
    }
  };

  const inputSize = useBreakpointValue({
    base: "sm",
    sm: "xs",
    md: "sm",
  });

  return (
    <Flex w="30.4vw" h="100vh" justify="center" align="center">
      <VStack h="100%" w="100%">
        <Flex h="20%" w="100%" justify="center" align="center">
          <Image
            src={"user.png"}
            w={["3rem", "3.5rem", "5rem"]}
            h={["3rem", "3rem", "4rem"]}
            pr="1vw"
          />
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize={{ base: "1.25rem", md: "2rem" }}
          >
            Bem vindo!
          </Text>
        </Flex>
        <Box h="75%" w="88%">
          <VStack
            spacing={["5vh", "3.5vh", "5vh"]}
            align="center"
            justify="center"
            backgroundColor="black"
            borderRadius="3xl"
          >
            <Text
              fontWeight="600"
              fontSize={{ base: "0.675rem", md: "1.5rem" }}
              color="white"
              textAlign="center"
              mt="3vh"
              paddingX="1vw"
            >
              Fazer um novo cumprimento
            </Text>
            <VStack w="75%" spacing={["5vh", "5vh", "5vh"]} as="form">
              <Input
                variant="filled"
                borderRadius="sm"
                size={inputSize}
                paddingX="5%"
                fontSize={["0.5rem", "0.675rem", "0.875rem"]}
                id="userReceiver"
                type="text"
                placeholder="Clique no usuário"
                _placeholder={{
                  color: "gray.600",
                  fontSize: { base: "0.5rem", sm: "0.675rem", md: "1rem" },
                }}
                _focus={{ background: "gray.300" }}
                error={formState.errors.user_receiver}
                {...register("user_receiver")}
              />
              <Input
                variant="filled"
                borderRadius="sm"
                size={inputSize}
                paddingX="5%"
                fontSize={["0.5rem", "0.675rem", "0.875rem"]}
                id="tagId"
                type="text"
                placeholder="Clique na tag"
                _placeholder={{
                  color: "gray.600",
                  fontSize: { base: "0.5rem", sm: "0.675rem", md: "1rem" },
                }}
                _focus={{ background: "gray.300" }}
                error={formState.errors.tag_id}
                {...register("tag_id")}
              />
              <Textarea
                h="20vh"
                mb={["6vh", "4.5vh", "6vh"]}
                variant="filled"
                borderRadius="sm"
                paddingY={["10%", "3%"]}
                paddingX="5%"
                fontSize={["0.5rem", "0.675rem", "0.875rem"]}
                id="message"
                placeholder="Mensagem"
                _placeholder={{
                  color: "gray.600",
                  fontSize: { base: "0.5rem", sm: "0.675rem", md: "1rem" },
                }}
                _focus={{ background: "gray.300" }}
                error={formState.errors.message}
                {...register("message")}
              />
            </VStack>
          </VStack>
          <Flex justify="center" mt={["3vh", "2vh", "3vh"]} h="20%">
            <Button
              type="submit"
              onClick={handleSubmit(handleCreate)}
              w={{ base: "75%", md: "50%" }}
              h="50%"
              borderRadius="3xl"
              fontWeight="600"
              fontSize={{ base: "0.675rem", md: "1.5rem" }}
              color="white"
              backgroundColor="black"
            >
              {formState.isSubmitting ? <Spinner /> : "Enviar"}
            </Button>
          </Flex>
        </Box>
      </VStack>
    </Flex>
  );
}
