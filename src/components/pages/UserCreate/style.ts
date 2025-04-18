import { styled } from "@linaria/react";
import { Form } from "antd";

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
`;

export const Content = styled(Form)``;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const FormItem = styled.div`
  width: 100%;
`;

export const ContainerButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;
