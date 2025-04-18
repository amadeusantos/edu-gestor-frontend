import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
  updateEnabledUser,
  usersPagination,
} from "../services/users.service";

export function useListUsers(page: number, size: number, search?: string) {
  return useQuery({
    queryKey: ["users", page, size, search],
    queryFn: () => usersPagination(search, page, size),
  });
}

export function useFindUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });
}

export function useUpdateEnabledUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      updateEnabledUser(id, enabled),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["users"] });
      // message.success('Atualizado com sucesso')
    }, 
  });
}
