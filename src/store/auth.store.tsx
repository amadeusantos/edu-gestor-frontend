import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authenticated, login, logout } from "../services/auth.service";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigator("/");
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
      queryClient.clear()
      navigator("/login")
    },
  });
}
