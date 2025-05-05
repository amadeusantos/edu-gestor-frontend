import { Button, Form } from "antd";
import { Title } from "../../ions";
import { InputForm } from "../../molecules/InputForm";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import * as S from "./style";
import { SelectForm } from "../../molecules/SelectForm";
import { Link, useNavigate, useParams } from "react-router";
import {
  useEditDiscipline,
  useFindDiscipline,
} from "../../../store/disciplines.store";
import { useState } from "react";
import { useListProfessors } from "../../../store/professors.store";
import { DisciplineUpdateSchema } from "../../../services/disciplines.service";
import { Loading } from "../../molecules/Loading";

export function DisciplineEdit() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { data, isLoading } = useFindDiscipline(id!);
  const [searchProfessor, setSearchProfessor] = useState<string | undefined>();
  const { data: professors } = useListProfessors(1, 5, searchProfessor);
  const { mutate } = useEditDiscipline(id!, {
    onSuccess: () => navigator("/disciplines"),
  });

  const options = professors
    ? [
        ...professors.results.map((prof) => ({
          label: prof.fullname,
          value: prof.id,
        })),
        { label: "Sem Professor", value: null },
      ]
    : [{ label: "Sem Professor", value: null }];

  if (data && data.professor) {
    options.concat({
      label: data.professor.fullname,
      value: data.professor.id,
    });
  }

  const onSearchProfessor = (value: string) => {
    setSearchProfessor(value === "" ? undefined : value);
  };

  const onFinish = (values: DisciplineUpdateSchema) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Editar de Disciplina</Title>
        <Form layout="vertical" initialValues={data} onFinish={onFinish}>
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
              options={options}
            />
          </S.Row>
          <S.Row>
            <SelectForm
              label="Turma"
              name="classroom_id"
              options={[
                { label: data?.classroom.name, value: data?.classroom.id },
              ]}
              rules={[{ required: true, message: "A turma é obrigatório!" }]}
              disabled
            />
            <div />
          </S.Row>
          <S.ContainerButtons>
            <Link to="/disciplines">
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
