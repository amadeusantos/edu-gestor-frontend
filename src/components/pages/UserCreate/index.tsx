import { Link, useNavigate } from "react-router";
import { useCreateUser } from "../../../store/users.store";
import { KeyRoleEnum, UserCreateSchema } from "../../../services/users.service";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { Button, Form, notification } from "antd";
import { SelectForm } from "../../molecules/SelectForm";
import { useListProfessors } from "../../../store/professors.store";
import { useListStudents } from "../../../store/students.store";
import { useState } from "react";

const Roles = [
  { value: "STUDENT", label: "Aluno" },
  { value: "PROFESSOR", label: "Professor" },
  { value: "COORDINATOR", label: "Coordenador" },
  { value: "ADMIN", label: "Administrador" },
  { value: "RESPONSIBLE", label: "Responsável" },
];

export function UserCreate() {
  const navigator = useNavigate();
  const [searchProfessor, setSearchProfessor] = useState<string | undefined>(
    undefined
  );
  const [searchStudent, setSearchStudent] = useState<string | undefined>(
    undefined
  );
  const { data: professors } = useListProfessors(1, 5, searchProfessor);
  const { data: students } = useListStudents(1, 5, searchStudent);
  const [api, contextHolder] = notification.useNotification();
  const { mutate } = useCreateUser({
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

  const onFinish = (values: UserCreateSchema) => {
    mutate({
      ...values,
      password: values.password,
    });
  };

  return (
    <SideBarTemplate>
      <S.Container>
        {contextHolder}
        <Title>Cadastro de Usuário</Title>
        <Form layout="vertical" form={form} onFinish={onFinish}>
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
                { required: true, message: "A Senha é obrigatória!" },
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
