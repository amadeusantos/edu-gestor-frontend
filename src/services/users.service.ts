import { request } from "./api";
import { PaginationSchema } from "./type";

export const RoleEnum = {
  STUDENT: "Aluno",
  PROFESSOR: "Professor",
  COORDINATOR: "Coordenador",
  ADMIN: "Administrador",
  RESPONSIBLE: "Responsável"
};

export type KeyRoleEnum = keyof typeof RoleEnum;

export interface UserSchema {
  id: string;
  email: string;
  role: KeyRoleEnum;
  enabled: boolean;
}

export interface UserCreateSchema {
  email: string;
  role: KeyRoleEnum;
  password: string;
}

export interface UserUpdateSchema {
  email: string;
  role: KeyRoleEnum;
  password?: string;
}


export async function usersPagination(
  search?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/users?size=${size}&page=${page}`;
  if (search) {
    uri += `&search=${search}`;
  }

  return await request.get<PaginationSchema<UserSchema>>(uri);
}

export async function getUser(id: string) {
  return await request.get<UserSchema>(`/users/${id}`);
}

export async function getUserByEmail(email: string) {
  return await request.get<UserSchema>(`/users/email/${email}`);
}

export async function createUser(user: UserCreateSchema) {
    await request.post("/users", user)
}

export async function updateUser(id: string, user: UserUpdateSchema) {
    await request.put(`/users/${id}`, user)
}

export async function updateEnabledUser(id: string, enabled: boolean) {
  await request.patch(`/users/${id}?enabled=${enabled}`);
}
