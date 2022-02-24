import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { UsersCompliments } from "../components/users/UsersCompliments";
import { UsersNewCompliment } from "../components/users/UsersNewCompliment";
import { UsersRegisteredInfo } from "../components/users/UsersRegisteredInfo";

export function Users() {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");

  return (
    <Flex
      w="100vw"
      h="100vh"
      backgroundImage="fundoDashboard.png"
      backgroundSize="100% 100%"
      justify="center"
      align="center"
    >
      <UsersCompliments update={shouldUpdate} />

      <UsersNewCompliment
        update={shouldUpdate}
        setUpdate={setShouldUpdate}
        selectedUserId={selectedUserId}
        selectedTagId={selectedTagId}
      />

      <UsersRegisteredInfo
        selectUserId={setSelectedUserId}
        selectTagId={setSelectedTagId}
      />
    </Flex>
  );
}
