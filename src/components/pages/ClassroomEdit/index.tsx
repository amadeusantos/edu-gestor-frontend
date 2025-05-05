import { Link, useNavigate, useParams } from "react-router";
import { Title } from "../../ions";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import * as S from "./style";
import { SelectForm } from "../../molecules/SelectForm";
import { InputForm } from "../../molecules/InputForm";
import { useState } from "react";
import { useListStudents } from "../../../store/students.store";
import {
  useEditClassroom,
  useFindClassroom,
} from "../../../store/classrooms.store";
import { ClassroomUpdateSchema } from "../../../services/classrooms.service";
import { Button, Form } from "antd";
import { Loading } from "../../molecules/Loading";

export function ClassroomEdit() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { data, isLoading } = useFindClassroom(id!);
  const [searchStudents, setSearchStudents] = useState<string | undefined>();
  const { data: students } = useListStudents(1, 5, searchStudents);
  const { mutate } = useEditClassroom(id!, {
    onSuccess: () => navigator("/classrooms"),
  });

  const optionsStudents = students?.results.map((student) => ({
    label: student.fullname,
    value: student.id,
  }));

  const studentsIds = students?.results.map((s) => s.id);

  if (optionsStudents && studentsIds && data) {
    optionsStudents.concat(
      data.students
        .filter((s) => studentsIds?.includes(s.id))
        .map((student) => ({
          label: student.fullname,
          value: student.id,
        }))
    );
  }
  const onSearchStudents = (value: string) => {
    setSearchStudents(value === "" ? undefined : value);
  };
  const onFinish = (values: ClassroomUpdateSchema) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Edição de Turma</Title>
        <Form
          layout="vertical"
          initialValues={{
            ...data,
            students_ids: data?.students.map((stud) => stud.id),
          }}
          onFinish={onFinish}
        >
          <S.Row>
            <InputForm
              label="Nome"
              name="name"
              rules={[{ required: true, message: "O nome é obrigatório!" }]}
            />
            <SelectForm
              label="Turno"
              name="shift"
              rules={[{ required: true, message: "O turno é obrigatório!" }]}
              options={[
                { label: "Manhã", value: "MORNING" },
                { label: "Tarde", value: "AFTERNOON" },
                { label: "Noite", value: "NIGHT" },
              ]}
            />
          </S.Row>
          <SelectForm
            label="Alunos"
            name="students_ids"
            onSearch={onSearchStudents}
            mode="multiple"
            options={optionsStudents}
          />

          <S.ContainerButtons>
            <Link to="/classrooms">
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Editar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.FormContainer>
    </SideBarTemplate>
  );
}
