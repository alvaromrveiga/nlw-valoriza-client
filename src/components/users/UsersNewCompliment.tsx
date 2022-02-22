import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUserCircle } from "react-icons/bi";
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
  const { register, handleSubmit, formState, reset } =
    useForm<ComplimentFormData>({
      resolver: yupResolver(complimentFormSchema),
    });

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

  return (
    <Flex w="30.4vw" h="100vh" justify="center" align="center">
      <VStack h="100%" w="100%">
        <Flex h="20%" w="100%" justify="center" align="center">
          <Image
            src={"user.png"}
            w={["3rem", "5rem"]}
            h={["3rem", "4rem"]}
            pr="1vw"
          />
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize={["1.25rem", "2rem"]}
          >
            Bem vindo!
          </Text>
        </Flex>
        <Box h="75%" w="88%">
          <VStack
            spacing="5vh"
            align="center"
            justify="center"
            backgroundColor="black"
            borderRadius="3xl"
          >
            <Text
              fontWeight="600"
              fontSize={["0.675rem", "1.5rem"]}
              color="white"
              textAlign="center"
              mt="3vh"
            >
              Fazer um novo cumprimento
            </Text>
            <VStack w="75%" spacing="5vh" as="form">
              <Input
                value={selectedUserId}
                variant="filled"
                size="sm"
                id="userReceiver"
                type="text"
                placeholder="ID"
                _placeholder={{ color: "gray.600" }}
                _focus={{ background: "#a6a6a6" }}
                error={formState.errors.user_receiver}
                {...register("user_receiver")}
              />
              <Input
                value={selectedTagId}
                variant="filled"
                size="sm"
                id="tagId"
                type="text"
                placeholder="Tag"
                _placeholder={{ color: "gray.600" }}
                _focus={{ background: "#a6a6a6" }}
                error={formState.errors.tag_id}
                {...register("tag_id")}
              />
              <Textarea
                h="20vh"
                mb="6vh"
                variant="filled"
                size="sm"
                id="message"
                placeholder="Mensagem"
                _placeholder={{ color: "gray.600" }}
                _focus={{ background: "#a6a6a6" }}
                error={formState.errors.message}
                {...register("message")}
              />
            </VStack>
          </VStack>
          <Flex justify="center" mt="3vh" h="20%">
            <Button
              type="submit"
              onClick={handleSubmit(handleCreate)}
              w={["75%", "50%"]}
              h={["50%", "50%"]}
              borderRadius="3xl"
              fontWeight="600"
              fontSize={["0.675rem", "1.5rem"]}
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
