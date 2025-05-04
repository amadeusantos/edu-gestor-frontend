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

export interface DisciplineMinimalSchema {
  id: string;
  name: string;
  classroom_id: string;
  professor_id?: string;
}

export interface ScoreMinimalSchema {
  id: string;
  value?: string;
  is_absent: boolean;
  fullname: string;
}
