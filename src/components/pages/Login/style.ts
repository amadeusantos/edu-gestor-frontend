import { styled } from "@linaria/react";
import { Form as FormAntd } from "antd";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(95deg, #52B69A, #FFA92C);
`;

export const Content = styled(FormAntd)`
  display: flex;
  flex-direction: column;
  width: 38rem;
  padding: 4em;
  border-radius: 1em;
  border: 1px solid #808080;
  background-color: #F6FAF9;
`;

export const Logo = styled.img`
  width: 250px;
  align-self: center;
`;
