import { Button, Form } from "antd";
import { Title } from "../../ions";
import { DateForm } from "../../molecules/DateForm";
import { SelectForm } from "../../molecules/SelectForm";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import * as S from "./style";
import { Link, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { useFindDiscipline } from "../../../store/disciplines.store";
import { useCreateExam } from "../../../store/exams.store";
import { ExamCreateSchema } from "../../../services/exams.service";
import { InputForm } from "../../molecules/InputForm";

export function ExamCreate() {
  const { disciplineId } = useParams();
  const navigator = useNavigate();
  const { data: discipline } = useFindDiscipline(disciplineId!);

  const { mutate } = useCreateExam({
    onSuccess: () => navigator(`/disciplines/${disciplineId}/exams`),
  });

  const onFinish = (values: ExamCreateSchema) => {
    mutate(values);
  };

  return (
    <SideBarTemplate>
      <S.Container>
        <Title>Criação de Prova</Title>
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
            <InputForm
              label="Título"
              name="title"
              rules={[{ required: true, message: "O título é obrigatorio!" }]}
            />

            <DateForm
              label="Data"
              name="date"
              minDate={dayjs(new Date())}
              rules={[{ required: true, message: "A data é obrigatoria!" }]}
            />
          </S.Row>
          <S.ContainerButtons>
            <Link to={`/disciplines/${disciplineId}/exams`}>
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
