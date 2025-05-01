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
  DisciplineEdit,
  Frequency,
  FrequencyCreate,
  Agenda,
  AgendaCreate,
  AgendaEdit,
  Exam,
  ExamCreate,
  ExamCorrection,
  ExamEdit,
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
          <Route path="/disciplines/new" element={<DisciplineCreate />} />
          <Route path="/disciplines/:id" element={<DisciplineEdit />} />
        </Route>
        <Route
          element={
            <PrivateRouter roles={["ADMIN", "COORDINATOR", "PROFESSOR"]} />
          }
        >
          <Route path="/disciplines" element={<Discipline />} />
          <Route path="/disciplines/new" element={<DisciplineCreate />} />
          <Route
            path="/disciplines/:disciplineId/frequencies"
            element={<Frequency />}
          />
          <Route
            path="/disciplines/:disciplineId/frequencies/new/:classroomId"
            element={<FrequencyCreate />}
          />
          <Route path="/disciplines/:disciplineId/exams" element={<Exam />} />
          <Route
            path="/disciplines/:disciplineId/exams/new"
            element={<ExamCreate />}
          />
          <Route
            path="/disciplines/:disciplineId/exams/:id/correction"
            element={<ExamCorrection />}
          />

          <Route
            path="/disciplines/:disciplineId/exams/:id"
            element={<ExamEdit />}
          />
          <Route path="/agenda/new" element={<AgendaCreate />} />
          <Route path="/agenda/:id" element={<AgendaEdit />} />
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
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/build" element={"Em construção"} />
        </Route>
        <Route path="*" element={<RedirectRouter />} />
      </Routes>
    </BrowserRouter>
  );
}
