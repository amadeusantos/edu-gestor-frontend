import { Button, Form, notification } from "antd";
import { Title } from "../../ions";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { DateForm } from "../../molecules/DateForm";
import { Link, useNavigate, useParams } from "react-router";
import { SelectForm } from "../../molecules/SelectForm";
import {
  useEditProfessor,
  useFindProfessor,
} from "../../../store/professors.store";
import { ProfessorUpdateSchema } from "../../../services/professors.service";
import { Loading } from "../../molecules/Loading";
import { validate as validateCPF } from "validation-br/dist/cpf";
import dayjs from "dayjs";

export function ProfessorUpdate() {
  const { id } = useParams();
  const { data, isLoading } = useFindProfessor(id!);
  const navigator = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { mutate } = useEditProfessor(id!, {
    onSuccess() {
      navigator("/professors");
    },
    notification: api,
  });

  const onFinish = (values: ProfessorUpdateSchema) => {
    mutate({
      ...values,
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <SideBarTemplate>
      <S.Container>
        {contextHolder}
        <Title>Edição de Professor</Title>
        <Form
          layout="vertical"
          initialValues={{ ...data, date_of_birth: dayjs(data?.date_of_birth) }}
          onFinish={onFinish}
        >
          <S.Row>
            <InputForm
              label="Nome"
              name="fullname"
              rules={[
                { required: true, message: "O nome é obrigatório!" },
                { max: 60, message: "O nome deve ter no máximo 60 caracteres" },
              ]}
            />
            <InputForm
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Email inválido!" }]}
            />
          </S.Row>

          <S.Row>
            <InputForm
              label="CPF"
              name="cpf"
              normalize={(value: string) => {
                value = value.replace(/\D/g, "");
                value = value.substring(0, 11);
                return value.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  "$1.$2.$3-$4"
                );
              }}
              rules={[
                { required: true, message: "O CPF é obrigatório!" },
                { len: 14, message: "CPF inválido!" },
                {
                  validator: (_, value) => {
                    if (value && validateCPF(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("CPF inválido!"));
                  },
                },
              ]}
            />

            <SelectForm
              label="Sexo"
              name="sex"
              options={[
                { label: "Masculino", value: "MALE" },
                { label: "Feminino", value: "FEMALE" },
                { label: "Outros", value: "OTHER" },
              ]}
              rules={[{ required: true, message: "O sexo é obrigatório!" }]}
            />

            <DateForm
              label="Data de Nascimento"
              name="date_of_birth"
              rules={[
                {
                  required: true,
                  message: "A data de nascimento é obrigatória!",
                },
              ]}
            />
            <InputForm
              label="Telefone"
              normalize={(value: string) => {
                value = value.replace(/\D/g, "");
                value = value.slice(0, 11);
                if (value.length == 10) {
                  return `(${value.slice(0, 2)}) ${value.slice(
                    2,
                    6
                  )}-${value.slice(6, 11)}`;
                }
                if (value.length == 11) {
                  return `(${value.slice(0, 2)}) ${value.slice(
                    2,
                    7
                  )}-${value.slice(7, 12)}`;
                }

                return value;
              }}
              name="phone"
              rules={[{ min: 14, max: 15, message: "Telefone inválido!" }]}
            />
          </S.Row>
          <S.ContainerButtons>
            <Link to="/professors">
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.Container>
    </SideBarTemplate>
  );
}
