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
import { Link, useNavigate, useParams } from "react-router";
import { ActivityEditSchema } from "../../../services/activities.service";
import {
  useEditActivity,
  useFindActivity,
} from "../../../store/activities.store";
import { Loading } from "../../molecules/Loading";

export function AgendaEdit() {
  const { id } = useParams();
  const { data, isLoading } = useFindActivity(id!);
  const [searchDiscipline, setSearchDiscipline] = useState<string | undefined>(
    undefined
  );
  const { data: disciplines } = useListDisciplines(1, 5, searchDiscipline);
  const navigator = useNavigate();
  const { mutate } = useEditActivity(id!, {
    onSuccess: () => navigator("/agenda"),
  });

  const onSearchDisciplines = (value: string) => {
    setSearchDiscipline(value === "" ? undefined : value);
  };

  const onFinish = (values: ActivityEditSchema) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Editar de Atividade na Agenda</Title>
        <Form
          layout="vertical"
          initialValues={{ ...data, date: dayjs(data?.date), disciplines_ids: data?.disciplines.map((disc)=> disc.id) }}
          onFinish={onFinish}
        >
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
              Editar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.FormContainer>
    </SideBarTemplate>
  );
}
