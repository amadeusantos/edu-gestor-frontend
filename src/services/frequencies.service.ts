import { request } from "./api";
import {
  DisciplineMinimalSchema,
  PaginationSchema,
  StudentMinimalSchema,
} from "./type";

export interface FrequencySchema {
  id: string;
  date: Date;
  discipline_id: string;
  discipline: DisciplineMinimalSchema;
  presents: StudentMinimalSchema[];
}

export interface FrequencyCreateSchema {
  date: Date;
  discipline_id: string;
  presents_ids: string[];
}

export interface FrequencyUpdateSchema {
  presents_ids: string[];
}

export async function frequenciesPagination(
  discipline_id?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/frequencies?size=${size}&page=${page}`;
  if (discipline_id) {
    uri += `&discipline_id=${discipline_id}`;
  }

  return await request.get<PaginationSchema<FrequencySchema>>(uri);
}

export async function getFrequency(id: string) {
  return await request.get<FrequencySchema>(`/frequencies/${id}`);
}

export async function createFrequency(frequency: FrequencyCreateSchema) {
  await request.post("/frequencies", frequency);
}

export async function updateFrequency(
  id: string,
  frequency: FrequencyUpdateSchema
) {
  await request.put(`/frequencies/${id}`, frequency);
}

export async function deleteFrequency(id: string) {
  await request.delete(`/frequencies/${id}`);
}
