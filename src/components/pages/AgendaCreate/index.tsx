import { Button, Form } from "antd";
import { Title } from "../../ions";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { useListDisciplines } from "../../../store/disciplines.store";
import { useState } from "react";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { SelectForm } from "../../molecules/SelectForm";
import { DateForm } from "../../molecules/DateForm";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import { ActivityCreateSchema } from "../../../services/activities.service";
import { useCreateActivity } from "../../../store/activities.store";
import { useListProfessors } from "../../../store/professors.store";

export function AgendaCreate() {
  const [searchDiscipline, setSearchDiscipline] = useState<string | undefined>(
    undefined
  );
  const [searchProfessor, setSearchProfessor] = useState<string | undefined>(
    undefined
  );
  const { data: disciplines } = useListDisciplines(1, 5, searchDiscipline);
  const { data: professors, isError: isErrorProfessors } = useListProfessors(
    1,
    5,
    searchProfessor
  );
  const navigator = useNavigate();
  const { mutate } = useCreateActivity({
    onSuccess: () => navigator("/agenda"),
  });

  const onSearchDisciplines = (value: string) => {
    setSearchDiscipline(value === "" ? undefined : value);
  };

  const onSearchProfessors = (value: string) => {
    setSearchProfessor(value === "" ? undefined : value);
  };

  const onFinish = (values: ActivityCreateSchema) => {
    mutate(values);
  };

  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Cadastro de Atividade na Agenda</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <InputForm
            label="Título"
            name="title"
            rules={[
              { required: true, message: "O título é obrigatório!" },
              {
                max: 64,
                message: "O título deve ter no máximo 64 caracteres!",
              },
            ]}
          />
          <InputForm
            type="TextArea"
            label="Descrição"
            name="description"
            rows={3}
            rules={[
              { required: true, message: "A descrição é obrigatória!" },
              {
                max: 256,
                message: "a descrição deve ter no máximo 256 caracteres!",
              },
            ]}
          />
          <S.Row>
            <DateForm
              label="Data de Entrega"
              name="date"
              minDate={dayjs()}
              rules={[
                { required: true, message: "A data de entrega é obrigatória!" },
              ]}
            />
            {!isErrorProfessors && (
              <SelectForm
                label="Professor"
                name="professor_id"
                onSearch={onSearchProfessors}
                options={professors?.results.map((prof) => ({
                  label: prof.fullname,
                  value: prof.id,
                }))}
                rules={[
                  { required: true, message: "O Professor é obrigatório!" },
                ]}
              />
            )}
            <SelectForm
              label="Disciplinas"
              name="disciplines_ids"
              mode="multiple"
              onSearch={onSearchDisciplines}
              options={disciplines?.results.map((disc) => ({
                label: disc.name,
                value: disc.id,
              }))}
              rules={[
                { required: true, message: "As Disciplinas é obrigatória!" },
              ]}
            />
          </S.Row>
          <S.ContainerButtons>
            <Link to="/Agenda">
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
