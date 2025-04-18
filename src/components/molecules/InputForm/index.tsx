import * as S from "./style";
import { Rule } from "antd/es/form";

interface InputFormProps {
  label?: string;
  name?: string;
  rules?: Rule[];
  type?: "TextArea" | "Password";
  rows?: number;
  disabled?: boolean;
}

const setContent = (type?: "TextArea" | "Password") => {
  switch (type) {
    case "Password":
      return S.Password;
    case "TextArea":
      return S.TextArea;
    default:
      return S.Input;
  }
};

export function InputForm({ type, rows, disabled, ...props }: InputFormProps) {
  const Content = setContent(type);
  return (
    <S.Container {...props}>
      <Content size="large" rows={rows} disabled={disabled} />
    </S.Container>
  );
}
