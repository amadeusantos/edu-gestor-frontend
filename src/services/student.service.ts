import { request } from "./api";
import { ClassroomMinimalSchema, PaginationSchema, SexEnum } from "./type";

export interface StudentCreateSchema {
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
  father_name?: string;
  mother_name?: string;
  responsible: string;
  enrollment: string;
  email?: string;
  phone: string;
  date_of_birth: Date;
  sex: SexEnum;
  archived: boolean;
  classroom?: ClassroomMinimalSchema; 
}

export async function studentsPagination(
  search?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/students?size=${size}&page=${page}`;
  if (search) {
    uri += `&search=${search}`;
  }

  return await request.get<PaginationSchema<StudentSchema>>(uri);
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
