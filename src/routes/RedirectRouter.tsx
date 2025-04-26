import { Navigate } from "react-router";
import { Loading } from "../components/molecules/Loading";
import { useUser } from "../store/auth.store";

const routers = {
  // TODO: alter student and responsible
  STUDENT: "/agenda",
  PROFESSOR: "/disciplines",
  COORDINATOR: "/students",
  ADMIN: "/users",
  RESPONSIBLE: "/agenda",
};

export function RedirectRouter() {
  const { data, isError, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Navigate to="/login" />;
  }

  return <Navigate to={routers[data!.role]} />;
}
