import { Button, Form } from "antd";
import * as S from "./style";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import { InputForm } from "../../molecules/InputForm";
import { SelectForm } from "../../molecules/SelectForm";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useListProfessors } from "../../../store/professors.store";
import { useCreateDiscipline } from "../../../store/disciplines.store";
import { useListClassrooms } from "../../../store/classrooms.store";
import { DisciplineCreateSchema } from "../../../services/disciplines.service";

export function DisciplineCreate() {
  const navigator = useNavigate();
  const [searchProfessor, setSearchProfessor] = useState<string | undefined>();
  const [searchClassroom, setSearchClassroom] = useState<string | undefined>();
  const { data: professors } = useListProfessors(1, 5, searchProfessor);
  const { data: classrooms } = useListClassrooms(1, 5, searchClassroom);
  const { mutate } = useCreateDiscipline({
    onSuccess: () => navigator("/disciplines"),
  });

  const onSearchProfessor = (value: string) => {
    setSearchProfessor(value === "" ? undefined : value);
  };
  const onSearchClassroom = (value: string) => {
    setSearchClassroom(value === "" ? undefined : value);
  };

  const onFinish = (values: DisciplineCreateSchema) => {
    mutate(values);
  };
  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Cadastro de Disciplina</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <S.Row>
            <InputForm
              label="Nome"
              name="name"
              rules={[{ required: true, message: "O nome é obrigatório!" }]}
            />
            <SelectForm
              label="Professor"
              name="professor_id"
              onSearch={onSearchProfessor}
              options={
                professors
                  ? [
                      ...professors.results.map((prof) => ({
                        label: prof.fullname,
                        value: prof.id,
                      })),
                      { label: "Sem Professor", value: null },
                    ]
                  : [{ label: "Sem Professor", value: null }]
              }
            />
          </S.Row>
          <S.Row>
            <SelectForm
              label="Turma"
              name="classroom_id"
              rules={[{ required: true, message: "A turma é obrigatório!" }]}
              onSearch={onSearchClassroom}
              options={classrooms?.results.map((clas) => ({
                label: clas.name,
                value: clas.id,
              }))}
            />
            <div />
          </S.Row>
          <S.ContainerButtons>
            <Link to="/disciplines">
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.FormContainer>
    </SideBarTemplate>
  );
}
