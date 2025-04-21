import { Link, useNavigate, useParams } from "react-router";
import { useEditUser, useFindUser } from "../../../store/users.store";
import { KeyRoleEnum, UserUpdateSchema } from "../../../services/users.service";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { Button, Form, notification } from "antd";
import { SelectForm } from "../../molecules/SelectForm";
import { Loading } from "../../molecules/Loading";
import { useState } from "react";
import { useListProfessors } from "../../../store/professors.store";
import { useListStudents } from "../../../store/students.store";

const Roles = [
  { value: "STUDENT", label: "Aluno" },
  { value: "PROFESSOR", label: "Professor" },
  { value: "COORDINATOR", label: "Coordenador" },
  { value: "ADMIN", label: "Administrador" },
  { value: "RESPONSIBLE", label: "Responsável" },
];

export function UserUpdate() {
  const { id } = useParams();
  const [searchProfessor, setSearchProfessor] = useState<string | undefined>(
    undefined
  );
  const [searchStudent, setSearchStudent] = useState<string | undefined>(
    undefined
  );
  const { data: professors } = useListProfessors(1, 5, searchProfessor);
  const { data: students } = useListStudents(1, 5, searchStudent);
  const { data, isLoading } = useFindUser(id!);
  const navigator = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { mutate } = useEditUser(id!, {
    onSuccess() {
      navigator("/users");
    },
    notification: api,
  });

  const [form] = Form.useForm();
  const roleValue: KeyRoleEnum = Form.useWatch("role", form);

  const onSearchProfessor = (value: string) => {
    setSearchProfessor(value === "" ? undefined : value);
  };

  const onSearchStudent = (value: string) => {
    setSearchStudent(value === "" ? undefined : value);
  };

  const InputAssociate = {
    PROFESSOR: (
      <SelectForm
        label="Associado"
        name="professor_id"
        onSearch={onSearchProfessor}
        rules={[
          {
            required: true,
            message: "Selecionar um associado é obrigatório!",
          },
        ]}
        options={professors?.results.map((v) => ({
          value: v.id,
          label: v.fullname,
        }))}
      />
    ),
    STUDENT: (
      <SelectForm
        label="Associado"
        name="student_id"
        rules={[
          {
            required: true,
            message: "Selecionar um associado é obrigatório!",
          },
        ]}
        onSearch={onSearchStudent}
        options={students?.results.map((v) => ({
          value: v.id,
          label: v.fullname,
        }))}
      />
    ),
    RESPONSIBLE: (
      <SelectForm
        label="Associado"
        name="student_id"
        rules={[
          {
            required: true,
            message: "Selecionar um associado é obrigatório!",
          },
        ]}
        onSearch={onSearchStudent}
        options={students?.results.map((v) => ({
          value: v.id,
          label: v.fullname,
        }))}
      />
    ),
  };

  const onFinish = (values: UserUpdateSchema) => {
    mutate({
      ...values,
      password: values.password === "" ? undefined : values.password,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SideBarTemplate>
      <S.Container>
        {contextHolder}
        <Title>Edição de Usuário</Title>
        <Form layout="vertical" form={form} initialValues={data} onFinish={onFinish}>
          <S.Row>
            <InputForm
              label="Email"
              name="email"
              rules={[
                { required: true, message: "O email é obrigatório!" },
                {
                  type: "email",
                  message: "Digite um email válido!",
                },
                // {
                //   validator: async (rule, value) => {
                //     try {
                //       await getUserByEmail(value);
                //       return Promise.reject(new Error("Email já cadastrado!"));
                //     } catch {
                //       return Promise.resolve();
                //     }
                //   },
                // },
              ]}
            />
            <SelectForm
              label="Perfil"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Selecionar um perfil é obrigatório!",
                },
              ]}
              options={Roles}
            />
          </S.Row>

          <S.Row>
            <InputForm
              label="Senha"
              name="password"
              type="Password"
              rules={[
                { min: 8, message: "A senha deve ter no mínimo 8 caracteres" },
              ]}
            />
            {"PROFESSOR" === roleValue ||
            roleValue === "STUDENT" ||
            roleValue === "RESPONSIBLE" ? (
              InputAssociate[roleValue]
            ) : (
              <div />
            )}
          </S.Row>
          <S.ContainerButton>
            <Link to="/users">
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
          </S.ContainerButton>
        </Form>
      </S.Container>
    </SideBarTemplate>
  );
}
