import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UseMutateProps } from "./interfaces";
import {
  createDiscipline,
  deleteDiscipline,
  disciplinesPagination,
  DisciplineUpdateSchema,
  getDiscipline,
  updateDiscipline,
} from "../services/disciplines.service";

export function useListDisciplines(
  page: number,
  size: number,
  search?: string
) {
  return useQuery({
    queryKey: ["disciplines", page, size, search],
    queryFn: () => disciplinesPagination(search, page, size),
    placeholderData: keepPreviousData,
  });
}

export function useFindDiscipline(id: string) {
  return useQuery({
    queryKey: ["disciplines", id],
    queryFn: () => getDiscipline(id),
  });
}

export function useCreateDiscipline({
  onSuccess,
  onError,
}: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiscipline,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["disciplines"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditDiscipline(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (discipline: DisciplineUpdateSchema) =>
      updateDiscipline(id, discipline),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["disciplines", id] });
      // message.success('Atualizado com sucesso')
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useDeleteDiscipline() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDiscipline,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["disciplines"] });
    },
  });
}
