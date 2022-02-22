import { Box, Flex, VStack } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { InfoPanel } from "../InfoPanel";
import { UsersInfoText } from "./UsersInfoText";

interface Compliment {
  id: string;
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
  created_at: string;
}

interface UsersComplimentsProps {
  update: boolean;
}

export function UsersCompliments({ update }: UsersComplimentsProps) {
  const [receivedCompliments, setReceivedCompliments] = useState<Compliment[]>(
    []
  );
  const [sentCompliments, setSentCompliments] = useState<Compliment[]>([]);

  useEffect(() => {
    const { token } = parseCookies();

    async function fetchApi() {
      const receivedComplimentsResponse = await api.get(
        "/users/compliments/receive",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sentComplimentsResponse = await api.get("/users/compliments/send", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReceivedCompliments(receivedComplimentsResponse.data);
      setSentCompliments(sentComplimentsResponse.data);
    }

    fetchApi();
  }, [update]);

  return (
    <Flex
      w="33.3vw"
      h="100vh"
      direction="column"
      justify="center"
      align="center"
    >
      <InfoPanel title="Elogios recebidos" backgroundColor="#f191f4">
        <VStack
          h="100%"
          w="100%"
          overflowY="scroll"
          justify="start"
          align="center"
        >
          {receivedCompliments.map((compliment) => {
            return (
              <Flex key={compliment.id} w="100%" borderBottom="1px solid gray">
                <UsersInfoText>
                  <b>De</b>: {compliment.user_sender} <br />
                  <b>Tag</b>: {compliment.tag_id} <br />
                  <b>Mensagem</b>: {compliment.message}
                </UsersInfoText>
              </Flex>
            );
          })}
        </VStack>
      </InfoPanel>
      <InfoPanel title="Elogios enviados" backgroundColor="#f191f4">
        <VStack h="100%" overflowY="scroll">
          {sentCompliments.map((compliment) => {
            return (
              <Box key={compliment.id} w="100%" borderBottom="1px solid gray">
                <UsersInfoText>
                  <b>Para</b>: {compliment.user_receiver} <br />
                  <b>Tag</b>: {compliment.tag_id} <br />
                  <b>Mensagem</b>: {compliment.message} <br />
                </UsersInfoText>
              </Box>
            );
          })}
        </VStack>
      </InfoPanel>
    </Flex>
  );
}
