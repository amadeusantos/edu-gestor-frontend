import {
  Button,
  Dropdown,
  Input,
  Layout,
  Modal,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Content } from "antd/es/layout/layout";
import { DotsThreeVertical, PencilSimpleLine, Trash } from "phosphor-react";
import { ProfessorSchema } from "../../../services/professors.service";
import { Link } from "react-router";
import {
  useDeleteProfessor,
  useListProfessors,
} from "../../../store/professors.store";
import { Title } from "../../ions";
import { useState } from "react";

const config = {
  title: "Remover Professor",
  content: "Deseja remover esse professor?",
};

const itemsDropdown = (
  record: ProfessorSchema,
  openModalDelete: (id: string) => void
) => [
  {
    key: 1,
    icon: <PencilSimpleLine size={16} />,
    label: (
      <Link to={{ pathname: `/professors/${record.id}` }}>Editar Professor</Link>
    ),
  },
  {
    key: 2,
    icon: <Trash size={16} />,
    label: "Remover Professor",
    onClick: () => {
      openModalDelete(record.id);
    },
  },
];

export function Professor() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading } = useListProfessors(page, 10, search);
  const { mutate: deleteProfessor } = useDeleteProfessor();
  const [modal, contextHolder] = Modal.useModal();
  const openModalDelete = (id: string) => {
    const actionDelete = () => deleteProfessor(id);

    modal.confirm({ ...config, onOk: actionDelete });
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

  const columns: TableColumnsType<ProfessorSchema> = [
    { title: "Nome", dataIndex: "fullname" },
    { title: "Disciplinas", dataIndex: "disciplines" },
    {
      title: "Status",
      dataIndex: "archived",
      render: (value) => (
        <Tag color={value ? "default" : "success"}>
          {value ? "Arquivado" : "Ativo"}
        </Tag>
      ),
    },
    {
      title: "Ações",
      render: (_, record) => (
        <Dropdown menu={{ items: itemsDropdown(record, openModalDelete) }}>
          <a>
            <DotsThreeVertical size={24} weight="bold" />
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <SideBarTemplate>
      <Layout style={{ padding: "1rem" }}>
        <Title>Professores</Title>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          <div>
            <Input.Search
              onClear={clearFilterSearch}
              onSearch={filtersSearch}
              allowClear
              placeholder="procurar professor"
              size="large"
            />
          </div>
          <Link to="/professors/new">
            <Button type="primary" size="large">
              Adicionar Professor
            </Button>
          </Link>
        </div>

        <Content>
          <Table<ProfessorSchema>
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
            style={{ padding: "2em" }}
            scroll={{ y: "65vh" }}
          />
          {contextHolder}
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
