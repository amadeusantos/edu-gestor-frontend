import { request } from "./api";
import Cookies from "js-cookie";
import { KeyRoleEnum } from "./users.service";

export interface LoginSchema {
  email: string;
  password: string;
}

interface TokenSchema {
  access_token: string;
}

interface RoleSchema {
  id: string;
  role: KeyRoleEnum;
  professor_id: string;
  student_id: string;
}

export async function login(auth: LoginSchema) {
  const { access_token } = await request.post<TokenSchema>("/auth/login", auth);
  Cookies.set("token", access_token);
}

export async function authenticated() {
  return await request.get<RoleSchema>("/auth/me");
}

export async function logout() {
  Cookies.remove("token");
}