import { Link, useNavigate, useParams } from "react-router";
import { useEditUser, useFindUser } from "../../../store/users.store";
import { UserUpdateSchema } from "../../../services/users.service";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import * as S from "./style";
import { InputForm } from "../../molecules/InputForm";
import { Button } from "antd";
import { SelectForm } from "../../molecules/SelectForm";
import { Loading } from "../../molecules/Loading";

const Roles = [
  { value: "STUDENT", label: "Aluno" },
  { value: "PROFESSOR", label: "Professor" },
  { value: "COORDINATOR", label: "Coordenador" },
  { value: "ADMIN", label: "Administrador" },
  { value: "RESPONSIBLE", label: "Responsável" },
];

export function UserUpdate() {
  const { id } = useParams();
  const { data, isLoading } = useFindUser(id!);
  const navigator = useNavigate();
  const { mutate } = useEditUser(id!, {
    onSuccess() {
      navigator("/users");
    },
  });

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
        <Title>Edição de Usuário</Title>
        <S.Content layout="vertical" initialValues={data} onFinish={onFinish}>
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
