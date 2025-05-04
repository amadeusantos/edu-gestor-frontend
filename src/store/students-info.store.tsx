import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { studentsInfoPagination } from "../services/students-info.service";

export function useListStudentsInfo(page: number, size: number, studentId?: string| null) {
    return useQuery({
      queryKey: ["students-info", page, size, studentId],
      queryFn: () => studentsInfoPagination(studentId, page, size),
      placeholderData: keepPreviousData,
    });
  }