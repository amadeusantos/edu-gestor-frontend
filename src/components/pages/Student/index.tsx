import {
  Button,
  Input,
  Layout,
  Modal,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Pencil, Trash } from "phosphor-react";
import { Link } from "react-router";
import { StudentSchema } from "../../../services/student.service";
import { useState } from "react";
import { Title } from "./style";
import {
  useDeleteStudent,
  useListStudents,
} from "../../../store/students.store";
import { SideBarTemplate } from "../../templates/SideBarTemplate";

const config = {
  title: "Remover Aluno",
  content: "Deseja remover esse aluno?",
};

export function Student() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading } = useListStudents(page, 10, search);
  const { mutate: deleteStudent } = useDeleteStudent();
  const [modal, contextHolder] = Modal.useModal();
  const openModalDelete = (id: string) => {
    const actionDelete = () => deleteStudent(id);

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

  const columns: TableColumnsType<StudentSchema> = [
    { title: "Nome", dataIndex: "fullname" },
    { title: "Matrícula", dataIndex: "enrollment" },
    {
      title: "Turma",
      dataIndex: "classroom",
      render: (value) => (
        <Tag color={value ? "blue" : "red"}>{value ? value : "Sem Turma"}</Tag>
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
          <Link to={{ pathname: `/students/${record.id}` }}>
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
        <Title>Alunos</Title>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          <div>
            <Input.Search
              onClear={clearFilterSearch}
              onSearch={filtersSearch}
              allowClear
              placeholder="procurar aluno"
              size="large"
            />
          </div>
          <Link to="/students/new">
            <Button type="primary" size="large">
              Adicionar Aluno
            </Button>
          </Link>
        </div>

        <Content>
          <Table<StudentSchema>
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
            dataSource={data?.results}
            style={{ padding: "2em" }}
            loading={isLoading}
          />
          {contextHolder}
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
