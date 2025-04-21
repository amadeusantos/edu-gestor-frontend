import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authenticated, login, logout } from "../services/auth.service";
import { useNavigate } from "react-router";
import { UseMutateProps } from "./interfaces";
import { ApiError } from "../services/api";
import { messages } from "./message";

export function useLogin({ notification }: UseMutateProps = {}) {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigator("/");
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (notification) {
          notification.error({
            message: "Error ao logar",
            description:
              error.error_code && messages[error.error_code]
                ? messages[error.error_code]
                : "Erro desconhecido!",
          });
        }
      }
    },
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authenticated,
    refetchInterval: 1000 * 60 * 50,
    retry: false,
  });
}

export function useLogout() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.clear();
      navigator("/login");
    },
  });
}
