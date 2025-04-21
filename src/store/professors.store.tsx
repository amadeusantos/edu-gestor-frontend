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
import { ApiError } from "../services/api";
import { messages } from "./message";

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
  notification,
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
    onError: (error) => {
      if (error instanceof ApiError) {
        if (notification) {
          notification.error({
            message: "Error ao criar o professor",
            description:
              error.error_code && messages[error.error_code]
                ? messages[error.error_code]
                : "Erro desconhecido!",
          });
        }
      }
      if (onError) {
        onError();
      }
    },
  });
}

export function useEditProfessor(
  id: string,
  { onSuccess, onError, notification }: UseMutateProps = {}
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
    onError: (error) => {
      if (error instanceof ApiError) {
        if (notification) {
          notification.error({
            message: "Error ao editar o professor",
            description:
              error.error_code && messages[error.error_code]
                ? messages[error.error_code]
                : "Erro desconhecido!",
          });
        }
      }
      if (onError) {
        onError();
      }
    },
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
