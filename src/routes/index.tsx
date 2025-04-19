import { BrowserRouter, Route, Routes } from "react-router";
import { PrivateRouter } from "./PrivateRouter";
import { AuthRouter } from "./AuthRouter";
import {
  User,
  Login,
  UserCreate,
  UserUpdate,
  Professor,
  ProfessorCreate,
  ProfessorUpdate
} from "../components/pages";
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
          <Route path="/users/new" element={<UserCreate />} />
          <Route path="/users/:id" element={<UserUpdate />} />
        </Route>
        <Route element={<PrivateRouter roles={["ADMIN", "COORDINATOR"]} />}>
          <Route path="/professors" element={<Professor />} />
          <Route path="/professors/new" element={<ProfessorCreate />} />
          <Route path="/professors/:id" element={<ProfessorUpdate />} />
        </Route>
        <Route
          element={
            <PrivateRouter
              roles={[
                "ADMIN",
                "STUDENT",
                "PROFESSOR",
                "COORDINATOR",
                "RESPONSIBLE",
              ]}
            />
          }
        >
          <Route path="/build" element={"Em construção"} />
        </Route>
        <Route path="*" element={<RedirectRouter />} />
      </Routes>
    </BrowserRouter>
  );
}
