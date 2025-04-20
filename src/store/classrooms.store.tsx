import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  classroomsPagination,
  ClassroomUpdateSchema,
  createClassroom,
  deleteClassroom,
  getClassroom,
  updateClassroom,
} from "../services/classrooms.service";
import { UseMutateProps } from "./interfaces";

export function useListClassrooms(page: number, size: number, search?: string) {
  return useQuery({
    queryKey: ["classrooms", page, size, search],
    queryFn: () => classroomsPagination(search, page, size),
    placeholderData: keepPreviousData,
  });
}

export function useFindClassroom(id: string) {
  return useQuery({
    queryKey: ["classrooms", id],
    queryFn: () => getClassroom(id),
  });
}

export function useCreateClassroom({
  onSuccess,
  onError,
}: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClassroom,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["classrooms"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditClassroom(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classroom: ClassroomUpdateSchema) =>
      updateClassroom(id, classroom),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["classrooms", id] });
      // message.success('Atualizado com sucesso')
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useDeleteClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClassroom,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["classrooms"] });
    },
  });
}
