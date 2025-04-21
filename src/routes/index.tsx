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
  ProfessorUpdate,
  Student,
  StudentCreate,
  StudentEdit,
  Classroom,
  ClassroomCreate,
  ClassroomEdit,
  Discipline,
  DisciplineCreate,
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
          <Route path="/students" element={<Student />} />
          <Route path="/students/new" element={<StudentCreate />} />
          <Route path="/students/:id" element={<StudentEdit />} />
          <Route path="/classrooms" element={<Classroom />} />
          <Route path="/classrooms/new" element={<ClassroomCreate />} />
          <Route path="/classrooms/:id" element={<ClassroomEdit />} />
          <Route path="/disciplines" element={<Discipline />} />
          <Route path="/disciplines/new" element={<DisciplineCreate />} />
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
