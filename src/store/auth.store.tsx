import { useMutation, useQuery } from "@tanstack/react-query";
import { authenticated, login } from "../services/auth.service";
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
  });
}
