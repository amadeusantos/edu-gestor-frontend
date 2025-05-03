import {
  Button,
  Checkbox,
  InputNumber,
  notification,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import * as S from "./style";
import {
  useEditExam,
  useEditScore,
  useFindExam,
} from "../../../store/exams.store";
import { Link, useNavigate, useParams } from "react-router";
import { ScoreMinimalSchema } from "../../../services/type";
import { ExamSchema, ScoreUpdateSchema } from "../../../services/exams.service";
import dayjs from "dayjs";

const tooltipMessage = (record: ExamSchema | undefined) => {
  if (record && record.is_finish) {
    return "Essa prova já foi finalizada";
  }

  if (record && dayjs(record.date).isAfter(new Date())) {
    return "Essa prova ainda não ocorreu";
  }

  return undefined;
};

export function ExamCorrection() {
  const { id, disciplineId } = useParams();
  const navigator = useNavigate();
  const { data } = useFindExam(id!);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [api, contextHolder] = notification.useNotification();
  const { mutate } = useEditExam(id!, {
    onSuccess: () => navigator(`/disciplines/${disciplineId}/exams`),
  });
  const [scoreForm, setScoreForm] = useState<ScoreUpdateSchema>({
    is_absent: false,
    value: 0,
  });
  const { mutate: mutateScore } = useEditScore();

  const isEditing = (record: ScoreMinimalSchema) => record.id === editingId;

  const setEdit = (record: ScoreMinimalSchema) => {
    setScoreForm({ is_absent: record.is_absent, value: Number(record.value) });
    setEditingId(record.id);
  };

  const setIsAbsent = (isAbsent: boolean) => {
    setScoreForm({ ...scoreForm, is_absent: isAbsent });
  };

  const setValue = (value: number) => {
    setScoreForm({ ...scoreForm, value: value });
  };

  const mutateEdit = () => {
    mutateScore({
      id: editingId!,
      is_absent: scoreForm.is_absent,
      value: scoreForm.is_absent ? 0 : scoreForm.value,
    });
    setEditingId(undefined);
    setScoreForm({
      is_absent: false,
      value: 0,
    });
  };

  const finishExam = () => {
    const invalidScores = data
      ? data?.scores.filter((score) => !score.is_absent && !score.value)
      : [];
    if (invalidScores.length > 0) {
      api.error({
        message: "Error ao finalizar prova",
        description: `Os alunos: ${invalidScores.map(
          (score, index, array) =>
            score.fullname + (index + 1 != array.length || ";")
        )}`,
      });
    } else {
      mutate({ date: data!.date, title: data!.title, is_finish: true });
    }
  };

  const columns: ColumnsType<ScoreMinimalSchema> = [
    {
      title: "Nome do Aluno",
      dataIndex: "fullname",
      width: "25%",
    },
    {
      title: "Presença",
      dataIndex: "is_absent",
      width: "25%",
      render: (value, record) =>
        isEditing(record) ? (
          <Checkbox
            checked={scoreForm.is_absent}
            onChange={(e) => setIsAbsent(e.target.checked)}
          />
        ) : (
          <Tag color={value ? "error" : "success"}>
            {value ? "Ausente" : "Presente"}
          </Tag>
        ),
    },
    {
      title: "Nota",
      dataIndex: "value",
      width: "25%",
      render: (value, record) =>
        isEditing(record) ? (
          <InputNumber
            min={0}
            max={10}
            step={0.01}
            disabled={scoreForm.is_absent}
            value={scoreForm.is_absent ? 0 : scoreForm.value}
            onChange={(e) => setValue(e || 0)}
          />
        ) : record.is_absent ? (
          "-"
        ) : (
          Number(value).toPrecision(3)
        ),
    },
    {
      title: "Ações",
      width: "25%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={mutateEdit}
              style={{ marginInlineEnd: 8 }}
            >
              Salvar
            </Typography.Link>
            <Typography.Link onClick={() => setEditingId(undefined)}>
              Cancelar
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={!!editingId}
            onClick={() => setEdit(record)}
          >
            Editar
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <SideBarTemplate>
      <S.Container>
        {contextHolder}
        <Title>Correção de Prova</Title>
        <div style={{ padding: "24px" }}>
          <Table<ScoreMinimalSchema>
            columns={columns}
            dataSource={data?.scores.sort((a, b) =>
              a.fullname.localeCompare(b.fullname)
            )}
            rowKey="id"
            pagination={false}
          />
        </div>
        <S.ContainerButtons>
          <Link to={`/disciplines/${disciplineId}/exams`}>
            <Button>Cancelar</Button>
          </Link>
          <Tooltip title={tooltipMessage(data)} placement="bottomRight">
            <Button
              onClick={finishExam}
              disabled={
                data?.is_finish || dayjs(data?.date).isAfter(new Date())
              }
              type="primary"
            >
              Finalizar
            </Button>
          </Tooltip>
        </S.ContainerButtons>
      </S.Container>
    </SideBarTemplate>
  );
}
