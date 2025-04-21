import { useState } from "react";
import {
  useDeleteClassroom,
  useListClassrooms,
} from "../../../store/classrooms.store";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Button, Input, Layout, Modal, Table, TableColumnsType } from "antd";
import { Content } from "antd/es/layout/layout";
import { ClassroomSchema } from "../../../services/classrooms.service";
import { Title } from "../../ions";
import { Link } from "react-router";
import { ShiftEnum } from "../../../services/type";
import { Pencil, Trash } from "phosphor-react";

const config = {
  title: "Remover Turma",
  content: "Deseja remover esse turma?",
};

const Shifts = {
  MORNING: "Manhã",
  AFTERNOON: "Tarde",
  NIGHT: "Noite",
};

export function Classroom() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading } = useListClassrooms(page, 10, search);
  const { mutate: deleteClassroom } = useDeleteClassroom();
  const [modal, contextHolder] = Modal.useModal();
  const openModalDelete = (id: string) => {
    const actionDelete = () => deleteClassroom(id);

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

  const columns: TableColumnsType<ClassroomSchema> = [
    { title: "Turma", dataIndex: "name" },
    {
      title: "Turno",
      dataIndex: "shift",
      render: (value: ShiftEnum) => Shifts[value],
    },
    {
      title: "Ações",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1em" }}>
          <Link to={{ pathname: `/classrooms/${record.id}` }}>
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
        <Title>Turmas</Title>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          <div>
            <Input.Search
              onClear={clearFilterSearch}
              onSearch={filtersSearch}
              allowClear
              placeholder="procurar turma"
              size="large"
            />
          </div>
          <Link to="/classrooms/new">
            <Button type="primary" size="large">
              Adicionar Turma
            </Button>
          </Link>
        </div>

        <Content>
          <Table<ClassroomSchema>
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
