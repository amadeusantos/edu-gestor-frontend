import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createFrequency,
  deleteFrequency,
  frequenciesPagination,
  FrequencyUpdateSchema,
  getFrequency,
  updateFrequency,
} from "../services/frequencies.service";
import { UseMutateProps } from "./interfaces";

export function useListFrequencies(
  page: number,
  size: number,
  discipline_id?: string
) {
  return useQuery({
    queryKey: ["frequencies", page, size, discipline_id],
    queryFn: () => frequenciesPagination(discipline_id, page, size),
    placeholderData: keepPreviousData,
  });
}

export function useFindFrequency(id: string) {
  return useQuery({
    queryKey: ["frequencies", id],
    queryFn: () => getFrequency(id),
  });
}

export function useCreateFrequency({
  onSuccess,
  onError,
}: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFrequency,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["frequencies"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditFrequency(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (frequency: FrequencyUpdateSchema) =>
      updateFrequency(id, frequency),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["frequencies", id] });
      // message.success('Atualizado com sucesso')
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useDeleteFrequency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFrequency,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["frequencies"] });
    },
  });
}
