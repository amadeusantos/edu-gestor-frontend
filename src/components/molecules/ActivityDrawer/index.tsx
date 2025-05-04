import { Button, Drawer, Form } from "antd";
import dayjs from "dayjs";
import { ActivitySchema } from "../../../services/activities.service";
import { InputForm } from "../../molecules/InputForm";
import { DateForm } from "../../molecules/DateForm";
import { SelectForm } from "../../molecules/SelectForm";
import { Link } from "react-router";
import { useUser } from "../../../store/auth.store";

type typeDrawer = "create" | "edit" | "readonly";

interface ActivityDrawerProps {
  activity?: Readonly<ActivitySchema | null>;
  open?: boolean;
  onCloseDrawer?: () => void;
  type?: typeDrawer;
}

export function ActivityDrawer({
  activity,
  type,
  onCloseDrawer,
  open,
}: ActivityDrawerProps) {
  const initialActivity = activity
    ? {
        ...activity,
        end_date: dayjs(activity.date),
        professor: {
          label: activity.professor.fullname,
          value: activity.professor.id,
        },
        disciplines: activity.disciplines.map((discipline) => ({
          label: discipline.name,
          value: discipline.id,
        })),
      }
    : {};
  const isReadonly = type === "readonly";
  const { data: user } = useUser();
  const editable =
    user &&
    (["ADMIN", "COORDINATOR"].includes(user.role) ||
      user.professor_id === activity?.professor_id);

  const titleDrawer = {
    create: "Criar Atividade",
    edit: "Editar Atividade",
    readonly: "Visualizar Atividade",
  };

  return (
    <Drawer
      footer={
        editable && (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Link to={`/agenda/${activity?.id}`}>
              <Button type="primary" size="large">
                Editar
              </Button>
            </Link>
          </div>
        )
      }
      width={648}
      title={type ? titleDrawer[type] : titleDrawer["create"]}
      onClose={onCloseDrawer}
      open={open}
    >
      {activity && (
        <Form
          layout="vertical"
          noValidate={isReadonly}
          initialValues={activity ? initialActivity : undefined}
          requiredMark={!isReadonly}
          disabled={isReadonly}
        >
          <InputForm
            label="Título"
            name="title"
            rules={[{ required: true, message: "O título é obrigatorio!" }]}
          />
          <InputForm
            type="TextArea"
            rows={3}
            label="descrição"
            name="description"
            rules={[{ required: true, message: "A descrição é obrigatorio!" }]}
          />
          <DateForm
            label="data de entrega"
            name="end_date"
            rules={[
              { required: true, message: "A data de entrega é obrigatorio!" },
            ]}
            minDate={dayjs(new Date())}
          />

          {type && type !== "create" && (
            <SelectForm label="Professor" name="professor" />
          )}
          <SelectForm
            label="Disciplinas"
            name="disciplines"
            mode="multiple"
            rules={[
              { required: true, message: "As disciplinas são obrigatorias!" },
              { min: 1, message: "Selecione pelo menos uma disciplina." },
            ]}
          />
        </Form>
      )}
    </Drawer>
  );
}
