import { request } from "./api";
import {
  DisciplineMinimalSchema,
  PaginationSchema,
  ScoreMinimalSchema,
} from "./type";

export interface ExamSchema {
  id: string;
  title: string;
  date: Date;
  is_finish: boolean;
  is_recovery: boolean;
  discipline_id: string;
  displine: DisciplineMinimalSchema;
  scores: ScoreMinimalSchema[];
}

export interface ExamCreateSchema {
  title: string;
  date: Date;
  is_finish?: boolean;
  is_recovery?: boolean;
  discipline_id: string;
}

export interface ExamUpdateSchema {
  title: string;
  date: Date;
  is_finish?: boolean;
}

export interface ScoreUpdateSchema {
  value?: number;
  is_absent: boolean;
}

export async function examsPagination(
  discipline_id?: string,
  page: number = 1,
  size: number = 10
) {
  let uri = `/exams?size=${size}&page=${page}`;

  if (discipline_id) {
    uri += `&discipline_id=${discipline_id}`;
  }

  return await request.get<PaginationSchema<ExamSchema>>(uri);
}

export async function getExam(id: string) {
  return await request.get<ExamSchema>(`/exams/${id}`);
}

export async function createExam(exam: ExamCreateSchema) {
  await request.post("/exams", exam);
}

export async function updateExam(id: string, exam: ExamUpdateSchema) {
  await request.put(`/exams/${id}`, exam);
}

export async function deleteExam(id: string) {
  await request.delete(`/exams/${id}`);
}

export async function updateScore(id: string, score: ScoreUpdateSchema) {
  await request.put(`/scores/${id}`, score);
}
