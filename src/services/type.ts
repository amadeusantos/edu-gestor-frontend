export interface PaginationSchema<T> {
  page: number;
  size: number;
  total_page: number;
  total_items: number;
  results: T[];
}

export type SexEnum = "MALE" | "FEMALE" | "OTHER";

export type ShiftEnum = "MORNING" | "AFTERNOON" | "NIGHT";

export interface StudentMinimalSchema {
  id: string;
  fullname: string;
  responsible: string;
  sex: SexEnum;
  classroom_id: string;
}

export interface ClassroomMinimalSchema {
  id: string;
  name: string;
  shift: ShiftEnum;
}

export interface ProfessorMinimalSchema {
  id: string;
  fullname: string;
  sex: SexEnum;
}
