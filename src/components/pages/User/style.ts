import { styled } from "@linaria/react";
import { Layout, Table as TableAntd } from "antd";

export const Container = styled(Layout)`
  padding: 1rem;
`;
export const Header = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

export const Table = styled(TableAntd)`
  padding: 2em;
`;
