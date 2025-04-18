import { Button, Input, Modal, TableColumnsType, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import { Pencil, Trash } from "phosphor-react";
import { Link } from "react-router";
import { Title } from "../../ions";
import { useListUsers, useUpdateEnabledUser } from "../../../store/users.store";
import { useState } from "react";
import {
  KeyRoleEnum,
  RoleEnum,
  UserSchema,
} from "../../../services/users.service";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import * as S from "./style";

export function User() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading } = useListUsers(page, 10, search);
  const { mutate: updateEnabledUser } = useUpdateEnabledUser();
  const [modal, contextHolder] = Modal.useModal();
  const openModalUpdate = (id: string, enabled: boolean) => {
    const actionUpdate = () => updateEnabledUser({ id, enabled: !enabled });
    const config = enabled
      ? {
          title: "Desativar usuário",
          content: "Deseja desativar esse usuário?",
        }
      : { title: "Ativar usuário", content: "Deseja ativar esse usuário?" };

    modal.confirm({ ...config, onOk: actionUpdate });
  };

  const filtersSearch = (value: string) => {
    if (value === "") {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };

  const clearFilterSearch = () => {
    setSearch(undefined);
  };

  const columns: TableColumnsType<UserSchema> = [
    { title: "Email", dataIndex: "email" },
    {
      title: "Perfil",
      dataIndex: "role",
      render: (value: KeyRoleEnum) => RoleEnum[value],
    },
    {
      title: "Associado",
    },
    {
      title: "Status",
      dataIndex: "enabled",
      render: (value) => (
        <Tag color={value ? "success" : "default"}>
          {value ? "Ativo" : "Inativo"}
        </Tag>
      ),
    },
    {
      title: "Ações",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1em" }}>
          <Link to={{ pathname: `/users/${record.id}` }}>
            <Button color="primary" variant="solid">
              <Pencil size={28} />
            </Button>
          </Link>
          <Button
            color="danger"
            variant="solid"
            onClick={() => {
              openModalUpdate(record.id, record.enabled);
            }}
          >
            <Trash size={28} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <SideBarTemplate>
      <S.Container>
        <Title>Usuários</Title>
        <S.Header>
          <div>
            <Input.Search
              onClear={clearFilterSearch}
              onSearch={filtersSearch}
              allowClear
              placeholder="procurar usuário"
              size="large"
            />
          </div>
          <Link to="/users/new">
            <Button type="primary" size="large">
              Adicionar Usuário
            </Button>
          </Link>
        </S.Header>

        <Content>
          <S.Table<UserSchema>
            pagination={{
              position: ["bottomCenter"],
              onChange: (page) => {
                setPage(page);
              },
              total: data?.total_items,
              pageSize: 10,
              showSizeChanger: false,
            }}
            rowKey={(value) => value.id}
            size="large"
            columns={columns}
            dataSource={data ? data.results : []}
            loading={isLoading}
          />
          {contextHolder}
        </Content>
      </S.Container>
    </SideBarTemplate>
  );
}
