import { request } from "./api";

export interface ActivitySchema {
  id: string;
  title: string;
  description: string;
  date: Date;
  is_exam: boolean;
  professor_id: string;
  professor: ProfessorMinimalSchema;
  disciplines: DisciplineMinimalSchema[];
}

export interface ActivityCreateSchema {
  title: string;
  description: string;
  date: Date;
  professor_id: string;
  disciplines_ids: string[];
}

export interface ActivityEditSchema {
  title: string;
  description: string;
  date: Date;
  disciplines_ids: string[];
}

export interface ProfessorMinimalSchema {
  id: string;
  fullname: string;
}

interface DisciplineMinimalSchema {
  id: string;
  name: string;
}

export async function listActivities(gte_date: string, lte_date: string) {
  const uri = `/activities?gte_date=${gte_date}&lte_date=${lte_date}`;
  return await request.get<Array<ActivitySchema>>(uri);
}

export async function getActivity(id: string) {
  return await request.get<ActivitySchema>(`/activities/${id}`);
}

export async function createActivity(activity: ActivityCreateSchema) {
  return await request.post<ActivitySchema>("/activities", activity);
}

export async function editActivity(id: string, activity: ActivityEditSchema) {
  return await request.put<ActivitySchema>(`/activities/${id}`, activity);
}

export async function deleteActivity(id: string) {
  await request.delete(`/activities/${id}`);
}
