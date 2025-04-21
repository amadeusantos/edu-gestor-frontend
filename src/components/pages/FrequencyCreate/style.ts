import { styled } from "@linaria/react";

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const FormItem = styled.div`
  width: 100%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;
