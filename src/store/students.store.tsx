import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentsPagination,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  StudentUpdateSchema,
} from "../services/student.service";
import { UseMutateProps } from "./interfaces";

export function useListStudents(page: number, size: number, search?: string) {
  return useQuery({
    queryKey: ["students", page, size, search],
    queryFn: () => studentsPagination(search, page, size),
  });
}

export function useFindStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => getStudent(id),
  });
}

export function useCreateStudent({ onSuccess, onError }: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStudent,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["students"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditStudent(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (student: StudentUpdateSchema) => updateStudent(id, student),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["students", id] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["students"] });
      // message.success('Atualizado com sucesso')
    },
  });
}
