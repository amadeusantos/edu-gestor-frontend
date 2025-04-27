import { request } from "./api";
import { PaginationSchema, SexEnum } from "./type";
import { KeyRoleEnum } from "./users.service";

export interface ProfessorCreateSchema {
  fullname: string;
  cpf: string;
  email?: string;
  phone?: string;
  date_of_birth: Date;
  sex: SexEnum;
}

export interface ProfessorUpdateSchema {
  fullname: string;
  cpf: string;
  email?: string;
  phone?: string;
  date_of_birth: Date;
  sex: SexEnum;
}

export interface ProfessorSchema {
    id: string;
    fullname: string;
    cpf: string;
    phone: string;
    date_of_birth: string;
    enrollment?: string;
    father_name?: string;
    mother_name?: string;
    responsible?: string;
    sex?: boolean;
    role: KeyRoleEnum
}

export async function professorsPagination(
  search?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/professors?size=${size}&page=${page}`;
  if (search) {
    uri += `&search=${search}`;
  }

  return await request.get<PaginationSchema<ProfessorSchema>>(uri);
}

export async function getProfessor(id: string) {
    return await request.get<ProfessorSchema>(`/professors/${id}`)
}

export async function createProfessor(professor: ProfessorCreateSchema) {
    await request.post("/professors", professor)
}

export async function updateProfessor(id: string, professor: ProfessorUpdateSchema) {
    await request.put(`/professors/${id}`, professor)
}

export async function deleteProfessor(id: string) {
    await request.delete(`/professors/${id}`)
}

