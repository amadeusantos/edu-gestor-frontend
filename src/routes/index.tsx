import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../components/pages/Login";
import { PrivateRouter } from "./PrivateRouter";
import { AuthRouter } from "./AuthRouter";
import { User } from "../components/pages/User";
import { RedirectRouter } from "./RedirectRouter";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRouter />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRouter roles={["ADMIN"]} />}>
          <Route path="/users" element={<User />} />
        </Route>
        <Route element={<PrivateRouter roles={["ADMIN", "STUDENT", "PROFESSOR", "COORDINATOR", "RESPONSIBLE"]} />}>
          <Route path="/build" element={"Em construção"} />
        </Route>
        <Route path="*" element={<RedirectRouter />}/>
      </Routes>
    </BrowserRouter>
  );
}
