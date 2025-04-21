import { request } from "./api";
import {
  ClassroomMinimalSchema,
  PaginationSchema,
  ProfessorMinimalSchema,
} from "./type";

export interface DisciplineSchema {
  id: string;
  name: string;
  classroom_id: string;
  professor_id?: string;
  classroom: ClassroomMinimalSchema;
  professor?: ProfessorMinimalSchema;
}

export interface DisciplineCreateSchema {
  name: string;
  classroom_id: string;
  professor_id?: string;
}

export interface DisciplineUpdateSchema {
  name: string;
  professor_id?: string;
}

export async function disciplinesPagination(
  search?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/disciplines?size=${size}&page=${page}`;
  if (search) {
    uri += `&search=${search}`;
  }

  return await request.get<PaginationSchema<DisciplineSchema>>(uri);
}

export async function getDiscipline(id: string) {
  return await request.get<DisciplineSchema>(`/disciplines/${id}`);
}

export async function createDiscipline(discipline: DisciplineCreateSchema) {
  await request.post("/disciplines", discipline);
}

export async function updateDiscipline(
  id: string,
  discipline: DisciplineUpdateSchema
) {
  await request.put(`/disciplines/${id}`, discipline);
}

export async function deleteDiscipline(id: string) {
  await request.delete(`/disciplines/${id}`);
}
