import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";

export function AuthRouter() {
    const token = Cookies.get("token")

    if (!token) {
        return <Outlet />;
      }

    return <Navigate to="/" />;
}