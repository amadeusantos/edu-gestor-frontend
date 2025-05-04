import { request } from "./api";
import { PaginationSchema, ShiftEnum, StudentMinimalSchema } from "./type";

export interface ClassroomSchema {
  id: string;
  name: string;
  shift: ShiftEnum;
  students: StudentMinimalSchema[];
}

export interface ClassroomCreateSchema {
  name: string;
  shift: ShiftEnum;
  students_ids: string[];
}

export interface ClassroomUpdateSchema {
  name: string;
  shift: ShiftEnum;
  students_ids: string[];
}

export async function classroomsPagination(
  search?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/classrooms?size=${size}&page=${page}`;
  if (search) {
    uri += `&search=${search}`;
  }

  return await request.get<PaginationSchema<ClassroomSchema>>(uri);
}

export async function getClassroom(id: string) {
  return await request.get<ClassroomSchema>(`/classrooms/${id}`);
}

export async function createClassroom(classroom: ClassroomCreateSchema) {
  await request.post("/classrooms", classroom);
}

export async function updateClassroom(
  id: string,
  classroom: ClassroomUpdateSchema
) {
  await request.put(`/classrooms/${id}`, classroom);
}

export async function deleteClassroom(id: string) {
  await request.delete(`/classrooms/${id}`);
}
