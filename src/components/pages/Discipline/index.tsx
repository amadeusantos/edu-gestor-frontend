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
import { Title } from "../../ions";
import { Link } from "react-router";
import { Content } from "antd/es/layout/layout";
import { DisciplineSchema } from "../../../services/disciplines.service";
import {
  useDeleteDiscipline,
  useListDisciplines,
} from "../../../store/disciplines.store";
import { useState } from "react";
import { Pencil, Trash } from "phosphor-react";

const config = {
  title: "Remover Disciplina",
  content: "Deseja remover esse disciplina?",
};

export function Discipline() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading } = useListDisciplines(page, 10, search);
  const { mutate: deleteDiscipline } = useDeleteDiscipline();
  const [modal, contextHolder] = Modal.useModal();
  const openModalDelete = (id: string) => {
    const actionDelete = () => deleteDiscipline(id);

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

  const columns: TableColumnsType<DisciplineSchema> = [
    { title: "Disciplina", dataIndex: "name" },
    {
      title: "Professor",
      dataIndex: "professor",
      render: (value) => (
        <Tag color={value ? "blue" : "red"}>
          {value ? value.fullname : "Sem Professor"}
        </Tag>
      ),
    },
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
          <Link to={{ pathname: `/disciplines/${record.id}` }}>
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
        <Title>Disciplinas</Title>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          <div>
            <Input.Search
              onClear={clearFilterSearch}
              onSearch={filtersSearch}
              allowClear
              placeholder="procurar disciplina"
              size="large"
            />
          </div>
          <Link to="/disciplines/new">
            <Button type="primary" size="large">
              Adicionar Turma
            </Button>
          </Link>
        </div>

        <Content>
          <Table<DisciplineSchema>
            rowKey="id"
            pagination={{
              position: ["bottomCenter"],
              onChange: (page) => {
                setPage(page);
              },
              total: data?.total_items,
              pageSize: 10,
              showSizeChanger: false,
            }}
            size="large"
            columns={columns}
            dataSource={data ? data.results : []}
            style={{ padding: "2em" }}
            loading={isLoading}
          />
          {contextHolder}
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
