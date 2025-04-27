import { api, request } from "./api";
import { PaginationSchema, SexEnum } from "./type";
import { KeyRoleEnum } from "./users.service";

export interface StudentCreateSchema {
  fullname: string;
  cpf: string;
  phone: string;
  date_of_birth: string;
  enrollment?: string;
  father_name?: string;
  mother_name?: string;
  responsible?: string;
  sex?: boolean;
  role: KeyRoleEnum;
}

export interface StudentUpdateSchema {
  fullname: string;
  cpf: string;
  father_name?: string;
  mother_name?: string;
  responsible: string;
  email?: string;
  phone: string;
  date_of_birth: Date;
  sex: SexEnum;
}

export interface StudentSchema {
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
  role: KeyRoleEnum;
}

export async function studentsPagination(
  search?: string,
  page: number = 1,
  size: number = 10
): Promise<PaginationSchema<StudentSchema>> {
  let uri = `/profiles?size=${size}&page_size=${page}`;
  if (search) {
    uri += `&fullname=${search}`;
  }

  const { data, headers } = await api.get<StudentSchema[]>(uri);

  return {
    results: data,
    total_items: Number(headers["X-Total-Count"]),
    page: Number(headers["X-Page"]),
    size: Number(headers["X-Page-Size"]),
    total_page: Number(headers["X-Total-Pages"]),
  };
}

export async function getStudent(id: string) {
  return await request.get<StudentSchema>(`/students/${id}`);
}

export async function createStudent(student: StudentCreateSchema) {
  await request.post("/students", student);
}

export async function updateStudent(id: string, student: StudentUpdateSchema) {
  await request.put(`/students/${id}`, student);
}

export async function deleteStudent(id: string) {
  await request.delete(`/students/${id}`);
}
