import {
  Button,
  Input,
  Layout,
  Modal,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Content } from "antd/es/layout/layout";
import { Pencil, Trash } from "phosphor-react";
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
        <div style={{ display: "flex", gap: "1em" }}>
          <Link to={{ pathname: `/professors/${record.id}` }}>
            <Button color="primary" variant="solid">
              <Pencil size={28} />
            </Button>
          </Link>
          <Button
            color="danger"
            variant="solid"
            onClick={() => {
              openModalDelete(record.id);
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
          />
          {contextHolder}
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
