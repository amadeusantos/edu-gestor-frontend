import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  createProfessor,
  deleteProfessor,
  getProfessor,
  professorsPagination,
  ProfessorUpdateSchema,
  updateProfessor,
} from "../services/professors.service";
import { UseMutateProps } from "./interfaces";

export function useListProfessors(page: number, size: number, search?: string) {
  return useQuery({
    queryKey: ["professors", page, size, search],
    queryFn: () => professorsPagination(search, page, size),
    placeholderData: keepPreviousData,
  });
}

export function useFindProfessor(id: string) {
  return useQuery({
    queryKey: ["professors", id],
    queryFn: () => getProfessor(id),
  });
}

export function useCreateProfessor({
  onSuccess,
  onError,
}: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProfessor,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["professors"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditProfessor(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (professor: ProfessorUpdateSchema) =>
      updateProfessor(id, professor),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["professors", id] });
      // message.success('Atualizado com sucesso')
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useDeleteProfessor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfessor,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["professors"] });
    },
  });
}
