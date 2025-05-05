import { Button, Form } from "antd";
import { Title } from "../../ions";
import { DateForm } from "../../molecules/DateForm";
import { SelectForm } from "../../molecules/SelectForm";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import * as S from "./style";
import { Link, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { useFindDiscipline } from "../../../store/disciplines.store";
import { useEditExam, useFindExam } from "../../../store/exams.store";
import { ExamUpdateSchema } from "../../../services/exams.service";
import { InputForm } from "../../molecules/InputForm";
import { Loading } from "../../molecules/Loading";

export function ExamEdit() {
  const { disciplineId, id } = useParams();
  const navigator = useNavigate();
  const { data: discipline, isLoading: isLoadingDiscipline } =
    useFindDiscipline(disciplineId!);
  const { data: exam, isLoading: isLoadingExam } = useFindExam(id!);

  const { mutate } = useEditExam(id!, {
    onSuccess: () => navigator(`/disciplines/${disciplineId}/exams`),
  });

  const onFinish = (values: ExamUpdateSchema) => {
    mutate(values);
  };

  if (isLoadingDiscipline || isLoadingExam) {
    return <Loading />;
  }

  return (
    <SideBarTemplate>
      <S.Container>
        <Title>Edição de Prova</Title>
        <Form
          layout="vertical"
          initialValues={{
            discipline_id: disciplineId,
            title: exam?.title,
            date: dayjs(exam?.date),
          }}
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
              rules={[
                { required: true, message: "O título é obrigatorio!" },
                {
                  max: 64,
                  message: "O título deve ter no máximo 64 caracteres",
                },
              ]}
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
              Editar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.Container>
    </SideBarTemplate>
  );
}
