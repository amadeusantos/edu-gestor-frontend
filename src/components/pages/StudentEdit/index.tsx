import { Button, Form } from "antd";
import { SelectForm } from "../../molecules/SelectForm";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { useEditStudent, useFindStudent } from "../../../store/students.store";
import { Link, useNavigate, useParams } from "react-router";
import { StudentUpdateSchema } from "../../../services/student.service";
import { Title } from "../../ions";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { DateForm } from "../../molecules/DateForm";
import { Loading } from "../../molecules/Loading";
import dayjs from "dayjs";
import { validate as validateCPF } from "validation-br/dist/cpf";

export function StudentEdit() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { data, isLoading, isError } = useFindStudent(id!);
  const { mutate } = useEditStudent(id!, {
    onSuccess: () => navigator("/students"),
  });
  const onFinish = (values: StudentUpdateSchema) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    navigator("..");
  }
  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Edição de Aluno</Title>
        <Form
          layout="vertical"
          initialValues={{ ...data, date_of_birth: dayjs(data!.date_of_birth) }}
          onFinish={onFinish}
        >
          <S.Row>
            <InputForm
              label="Nome"
              name="fullname"
              rules={[{ required: true, message: "O nome é obrigatório!" }]}
            />
            <InputForm
              label="Matrícula"
              name="enrollment"
              rules={[
                { required: true, message: "A matrícula é obrigatório!" },
              ]}
            />
            <InputForm
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Email inválido!" }]}
            />
          </S.Row>

          <S.Row>
            <InputForm label="Nome da mãe" name="mother_name" />
            <InputForm label="Nome do pai" name="father_name" />
            <InputForm
              label="Nome do responsável"
              name="responsible"
              rules={[
                {
                  required: true,
                  message: "O nome do responsável é obrigatório!",
                },
              ]}
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
              name="phone"
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
              rules={[
                {
                  required: true,
                  message: "O telefone é obrigatório!",
                },
                { min: 14, max: 15, message: "Telefone inválido!" },
              ]}
            />
          </S.Row>
          <S.ContainerButtons>
            <Link to="/students">
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
