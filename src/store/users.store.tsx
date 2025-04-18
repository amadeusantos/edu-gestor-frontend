import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getUser,
  getUserByEmail,
  updateEnabledUser,
  updateUser,
  usersPagination,
  UserUpdateSchema,
} from "../services/users.service";
import { UseMutateProps } from "./interfaces";

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

export function useFindUserByEmail(email: string) {
  return useQuery({
    queryKey: ["users", email],
    queryFn: () => getUserByEmail(email),
    retry: false,
  });
}

export function useCreateUser({ onSuccess, onError }: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["users"] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useEditUser(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserUpdateSchema) => updateUser(id, user),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["users", id] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useUpdateEnabledUser({
  onSuccess,
  onError,
}: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      updateEnabledUser(id, enabled),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["users"] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}
