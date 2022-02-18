import { setCookie } from "nookies";
import { NavigateFunction } from "react-router-dom";
import { api } from "../services/api";

interface LoginProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export async function login({ email, password, navigate }: LoginProps) {
  const loginResponse = await api.post("/login", { email, password });

  if (loginResponse.status === 200) {
    setCookie(null, "token", loginResponse.data, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    navigate("/users", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
}
