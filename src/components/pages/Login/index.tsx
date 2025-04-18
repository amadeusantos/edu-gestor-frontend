import { Button } from "antd";
import Logo from "../../../assets/logo.png";
import { InputForm } from "../../molecules/InputForm";
import { useLogin } from "../../../store/auth.store";
import { LoginSchema } from "../../../services/auth.service";
import * as S from "./style";
import { Loading } from "../../molecules/Loading";

export function Login() {
  const { mutate, isPending } = useLogin();
  const onFinish = (values: LoginSchema) => {
    mutate(values);
  };
  const onFinishFailed = () => {};
  return (
    <S.Container>
      <S.Content
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <S.Logo src={Logo} style={{ width: 250, alignSelf: "center" }} />

        <InputForm
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "O email é nescessário para fazer login!",
            },
            {
              type: "email",
              message: "Digite um email válido!",
            },
          ]}
        />
        <InputForm
          label="Senha"
          name="password"
          type="Password"
          rules={[{ required: true, message: "Digite sua senha." }]}
        />

        <Button type="primary" htmlType="submit" size="large">
          Entrar
        </Button>
      </S.Content>
      {isPending ?? <Loading />}
    </S.Container>
  );
}
