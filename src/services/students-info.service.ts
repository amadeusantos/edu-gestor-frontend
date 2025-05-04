import { request } from "./api";
import { PaginationSchema } from "./type";

export interface StudentInfoSchema {
      discipline_name: string;
      professor_name: string;
      faults: number;
      classes: number;
      average_grade: number;
} 

export async function studentsInfoPagination(
  student_id?: string | null,
  page: number = 1,
  size: number = 10
) {
  let uri = `/students/info?size=${size}&page=${page}`;
  if (student_id) {
    uri += `&student_id=${student_id}`;
  }

  return await request.get<PaginationSchema<StudentInfoSchema>>(uri);
}