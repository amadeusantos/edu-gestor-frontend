import { Link, useNavigate, useParams } from "react-router";
import { useFindDiscipline } from "../../../store/disciplines.store";
import { useFindClassroom } from "../../../store/classrooms.store";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Button, Form, Table } from "antd";
import { SelectForm } from "../../molecules/SelectForm";
import { DateForm } from "../../molecules/DateForm";
import dayjs from "dayjs";
import { FrequencyCreateSchema } from "../../../services/frequencies.service";
import * as S from "./style";
import { StudentMinimalSchema } from "../../../services/type";
import { Key, useState } from "react";
import { Title } from "../../ions";
import { useCreateFrequency } from "../../../store/frequencies.store";

export function FrequencyCreate() {
  const { disciplineId, classroomId } = useParams();
  const navigator = useNavigate();
  const { data: discipline } = useFindDiscipline(disciplineId!);
  const [presents, setPresents] = useState<Key[]>([]);
  const { data: classroom, isLoading: isLoadingClassroom } = useFindClassroom(
    classroomId!
  );
  const { mutate } = useCreateFrequency({
    onSuccess: () => navigator(`/disciplines/${disciplineId}/frequencies`),
  });

  const onSelectPresentsChange = (keys: Key[]) => {
    setPresents(keys);
  };

  const onFinish = (values: Omit<FrequencyCreateSchema, "presents_ids">) => {
    mutate({ ...values, presents_ids: presents.map(String) });
  };

  return (
    <SideBarTemplate>
      <S.Container>
        <Title>Criação de Frequência</Title>
        <Form
          layout="vertical"
          initialValues={{ discipline_id: disciplineId }}
          onFinish={onFinish}
        >
          <S.Row>
            <SelectForm
              label="Disciplina"
              name="discipline_id"
              disabled
              options={[{ label: discipline?.name, value: discipline?.id }]}
            />
            <DateForm
              label="Data"
              name="date"
              maxDate={dayjs(new Date())}
              rules={[{ required: true, message: "A data é obrigatoria!" }]}
            />
          </S.Row>
          <Table<StudentMinimalSchema>
            rowSelection={{
              selectedRowKeys: presents,
              onChange: onSelectPresentsChange,
            }}
            rowKey="id"
            size="large"
            pagination={false}
            columns={[
              { title: "Nome", dataIndex: "fullname" },
              Table.SELECTION_COLUMN,
            ]}
            dataSource={classroom ? classroom.students : []}
            style={{ padding: "2em" }}
            loading={isLoadingClassroom}
          />
          <S.ContainerButtons>
            <Link to={`/disciplines/${disciplineId}/frequencies`}>
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Criar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.Container>
    </SideBarTemplate>
  );
}
