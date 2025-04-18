import { Navigate, Outlet } from "react-router";
import { Loading } from "../components/molecules/Loading";
import { useUser } from "../store/auth.store";

interface PrivateRouterProps {
  roles: string[];
}

export function PrivateRouter({ roles }: PrivateRouterProps) {
  const { data, isError, isLoading, isSuccess } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && roles.includes(data.role)) {
    return <Outlet />;
  }

  if (isError || !data) {
    return <Navigate to="/login" />;
  }

  return <Navigate to=".." />;
}
