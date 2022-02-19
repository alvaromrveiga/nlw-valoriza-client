import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../services/api";

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

export function Users() {
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
    <>
      <span>
        {users.map((user) => {
          return (
            <>
              <p key={user.id}>{user.name}</p>
              <p>{user.email}</p>
              <br />
            </>
          );
        })}
      </span>
      <>
        {tags.map((tag) => {
          return <p key={tag.id}>{tag.name}</p>;
        })}
      </>
    </>
  );
}
