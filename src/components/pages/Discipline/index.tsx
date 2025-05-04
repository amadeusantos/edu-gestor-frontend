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
import { Title } from "../../ions";
import { Link } from "react-router";
import { Content } from "antd/es/layout/layout";
import { DisciplineSchema } from "../../../services/disciplines.service";
import {
  useDeleteDiscipline,
  useListDisciplines,
} from "../../../store/disciplines.store";
import { useState } from "react";
import {
  DotsThreeVertical,
  Exam,
  Notebook,
  PencilSimpleLine,
  Trash,
} from "phosphor-react";
import { KeyRoleEnum } from "../../../services/users.service";
import { useUser } from "../../../store/auth.store";

const config = {
  title: "Remover Disciplina",
  content: "Deseja remover esse disciplina?",
};

const itemsDropdown = (
  role: KeyRoleEnum,
  record: DisciplineSchema,
  openModalDelete: (id: string) => void
) => {
  return ["ADMIN", "COORDINATOR"].includes(role)
    ? [
        {
          key: 1,
          icon: <PencilSimpleLine size={16} />,
          label: (
            <Link to={{ pathname: `/disciplines/${record.id}` }}>
              Editar Disciplina
            </Link>
          ),
        },
        {
          key: 3,
          icon: <Notebook size={16} />,
          label: (
            <Link to={{ pathname: `/disciplines/${record.id}/frequencies` }}>
              Ver Frequência
            </Link>
          ),
        },
        {
          key: 4,
          icon: <Notebook size={16} />,
          label: (
            <Link
              to={{
                pathname: `/disciplines/${record.id}/frequencies/new/${record.classroom_id}`,
              }}
            >
              Adicionar Frequência
            </Link>
          ),
        },
        {
          key: 5,
          icon: <Exam size={16} />,
          label: (
            <Link to={{ pathname: `/disciplines/${record.id}/exams` }}>
              Ver Provas
            </Link>
          ),
        },
        {
          key: 2,
          icon: <Trash size={16} />,
          label: "Remover Disciplina",
          onClick: () => {
            openModalDelete(record.id);
          },
        },
      ]
    : [
        {
          key: 3,
          icon: <Notebook size={16} />,
          label: (
            <Link to={{ pathname: `/disciplines/${record.id}/frequencies` }}>
              Ver Frequência
            </Link>
          ),
        },
        {
          key: 4,
          icon: <Notebook size={16} />,
          label: (
            <Link
              to={{
                pathname: `/disciplines/${record.id}/frequencies/new/${record.classroom_id}`,
              }}
            >
              Adicionar Frequência
            </Link>
          ),
        },
        {
          key: 5,
          icon: <Exam size={16} />,
          label: (
            <Link to={{ pathname: `/disciplines/${record.id}/exams` }}>
              Ver Provas
            </Link>
          ),
        },
      ];
};

export function Discipline() {
  const [page, setPage] = useState(1);
  const { data: user } = useUser();
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
      title: "Turma",
      dataIndex: "classroom",
      render: (value) => <Tag color={"cyan"}>{value.name}</Tag>,
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
        <Dropdown
          menu={{ items: itemsDropdown(user!.role, record, openModalDelete) }}
        >
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
          {user?.role != "PROFESSOR" && (
            <Link to="/disciplines/new">
              <Button type="primary" size="large">
                Adicionar Disciplina
              </Button>
            </Link>
          )}
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
            scroll={{ y: "65vh" }}
          />
          {contextHolder}
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
