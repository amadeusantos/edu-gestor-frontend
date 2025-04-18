import { request } from "./api";
import Cookies from "js-cookie";
import { KeyRoleEnum } from "./users.service";

export interface LoginSchema {
  email: string;
  password: string;
}

interface TokenSchema {
  token: string;
}

interface RoleSchema {
    role: KeyRoleEnum;
}

export async function login(auth: LoginSchema) {
  const { token } = await request.post<TokenSchema>("/auth/login", auth);
  Cookies.set("token", token);
}

export async function authenticated() {
    return await request.get<RoleSchema>("/auth/authenticated");
}

export function logout() {
    Cookies.remove("token");
}