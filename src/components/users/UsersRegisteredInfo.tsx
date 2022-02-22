import { Box, Flex, VStack } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { InfoPanel } from "../InfoPanel";
import { UsersInfoText } from "./UsersInfoText";

interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

interface Tag {
  id: string;
  name: string;
  name_custom: string;
  created_at: string;
  updated_at: string;
}

interface UsersRegisteredInfoProps {
  selectUserId: (uuid: string) => void;
  selectTagId: (uuid: string) => void;
}

export function UsersRegisteredInfo({
  selectUserId,
  selectTagId,
}: UsersRegisteredInfoProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const { token } = parseCookies();

    async function fetchApi() {
      const usersResponse = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tagsResponse = await api.get("/tags", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(usersResponse.data);
      setTags(tagsResponse.data);
    }

    fetchApi();
  }, []);

  return (
    <Flex
      w="33.3vw"
      h="100vh"
      direction="column"
      justify="center"
      align="center"
    >
      <InfoPanel title="Usuários cadastrados" backgroundColor="#9e89ca">
        <VStack h="100%" overflowY="scroll">
          {users.map((user) => {
            return (
              <Box
                key={user.id}
                w="100%"
                _hover={{ color: "blue", cursor: "pointer" }}
                borderBottom="1px solid gray"
                onClick={() => selectUserId(user.id)}
              >
                <UsersInfoText>
                  <b>{user.name}</b>: {user.id}
                </UsersInfoText>
              </Box>
            );
          })}
        </VStack>
      </InfoPanel>
      <InfoPanel title="Tags cadastradas" backgroundColor="#9e89ca">
        <VStack h="100%" overflowY="scroll">
          {tags.map((tag) => {
            return (
              <Box
                key={tag.id}
                _hover={{ color: "blue", cursor: "pointer" }}
                borderBottom="1px solid gray"
                onClick={() => selectTagId(tag.id)}
              >
                <UsersInfoText>
                  <b>{tag.name}</b>: {tag.id}
                </UsersInfoText>
              </Box>
            );
          })}
        </VStack>
      </InfoPanel>
    </Flex>
  );
}
