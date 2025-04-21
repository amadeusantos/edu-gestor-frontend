import { Button, Dropdown, Input, Modal, TableColumnsType, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  DotsThreeVertical,
  PencilSimpleLine,
  Trash,
} from "phosphor-react";
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

const renderFullname = (value: KeyRoleEnum, record: UserSchema) => {
  if (value === "PROFESSOR" && record.professor) {
    return record.professor.fullname;
  }

  if ((value === "STUDENT" || value === "RESPONSIBLE") && record.student) {
    return record.student.fullname;
  }
};

const itemsDropdown = (
  record: UserSchema,
  openModalDelete: (id: string, b: boolean) => void
) => [
  {
    key: 1,
    icon: <PencilSimpleLine size={16} />,
    label: <Link to={{ pathname: `/users/${record.id}` }}>Editar Usuário</Link>,
  },
  {
    key: 2,
    icon: <Trash size={16} />,
    label: record.enabled ? "Desativar Usuário" : "Ativar Usuário",
    onClick: () => {
      openModalDelete(record.id, record.enabled);
    },
  },
];

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
      dataIndex: "role",
      render: renderFullname,
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
        <Dropdown menu={{ items: itemsDropdown(record, openModalUpdate) }}>
          <a>
            <DotsThreeVertical size={24} weight="bold" />
          </a>
        </Dropdown>
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
            scroll={{ y: "65vh" }}
          />
          {contextHolder}
        </Content>
      </S.Container>
    </SideBarTemplate>
  );
}
