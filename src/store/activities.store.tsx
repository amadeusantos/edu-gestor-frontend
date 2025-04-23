import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ActivityEditSchema,
  createActivity,
  editActivity,
  getActivity,
  listActivities,
} from "../services/activities.service";
import { UseMutateProps } from "./interfaces";

export function useListActivities(gte_date: string, lte_date: string) {
  return useQuery({
    queryKey: ["activities", gte_date, lte_date],
    queryFn: () => listActivities(gte_date, lte_date),
  });
}

export function useFindActivity(id: string) {
  return useQuery({
    queryKey: ["activities", id],
    queryFn: () => getActivity(id),
  });
}

export function useCreateActivity({ onSuccess, onError }: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivity,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["activities"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditActivity(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (activity: ActivityEditSchema) =>
      editActivity(id, activity),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["activities"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}
