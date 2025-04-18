import { Link, useNavigate } from "react-router";
import { useCreateUser } from "../../../store/users.store";
import { UserCreateSchema } from "../../../services/users.service";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { Button } from "antd";
import { SelectForm } from "../../molecules/SelectForm";

const Roles = [
  { value: "STUDENT", label: "Aluno" },
  { value: "PROFESSOR", label: "Professor" },
  { value: "COORDINATOR", label: "Coordenador" },
  { value: "ADMIN", label: "Administrador" },
  { value: "RESPONSIBLE", label: "Responsável" },
];

export function UserCreate() {
  const navigator = useNavigate();
  const { mutate } = useCreateUser({
    onSuccess() {
      navigator("/users");
    },
  });

  const onFinish = (values: UserCreateSchema) => {
    mutate({
      ...values,
      password: values.password,
    });
  };

  return (
    <SideBarTemplate>
      <S.Container>
        <Title>Cadastro de Usuário</Title>
        <S.Content layout="vertical" onFinish={onFinish}>
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
            <div />
          </S.Row>
          <S.ContainerButton>
            <Link to="/users">
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
          </S.ContainerButton>
        </S.Content>
      </S.Container>
    </SideBarTemplate>
  );
}
