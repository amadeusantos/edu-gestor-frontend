import { Button, Dropdown, Layout, Table, TableColumnsType, Tag } from "antd";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import { Link, useParams } from "react-router";
import { Content } from "antd/es/layout/layout";
import { useFindDiscipline } from "../../../store/disciplines.store";
import { useState } from "react";
import { Loading } from "../../molecules/Loading";
import { useListExams } from "../../../store/exams.store";
import { ExamSchema } from "../../../services/exams.service";
import dayjs from "dayjs";
import { DotsThreeVertical, PencilSimpleLine } from "phosphor-react";

const progressStatus = (isFinish: boolean, date: Date) => {
  if (isFinish) {
    return ["success", "Finalizada"];
  }

  if (dayjs(date).isAfter(new Date())) {
    return ["default", "Pré-prova"];
  }
  return ["processing", "Em andamento"];
};

export function Exam() {
  const { disciplineId } = useParams();
  const [page, setPage] = useState(1);
  const { data: discipline } = useFindDiscipline(disciplineId!);
  const { data, isLoading } = useListExams(page, 10, disciplineId);

  const columns: TableColumnsType<ExamSchema> = [
    {
      title: "Título",
      dataIndex: "title",
      render: (value, record) => (
        <Link to={`/disciplines/${disciplineId}/exams/${record.id}/correction`}>
          {value}
        </Link>
      ),
    },
    {
      title: "Correção",
      dataIndex: "is_finish",
      render: (value, record) => {
        const [color, response] = progressStatus(value, record.date);
        return <Tag color={color}>{response}</Tag>;
      },
    },
    {
      title: "Data",
      dataIndex: "date",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      render: (_, record) => (!record.is_finish &&
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                icon: <PencilSimpleLine size={16} />,
                label: (
                  <Link to={`/disciplines/${disciplineId}/exams/${record.id}`}>
                    Editar Prova
                  </Link>
                ),
              },
            ],
          }}
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
        <Title>Provas de {discipline?.name}</Title>
        <div
          style={{
            display: "flex",
            paddingTop: "1rem",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/disciplines`}>
            <Button size="large">Voltar</Button>
          </Link>
          <Link to={`/disciplines/${disciplineId}/exams/new/`}>
            <Button type="primary" size="large">
              Adicionar Prova
            </Button>
          </Link>
        </div>

        <Content>
          <Table<ExamSchema>
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
          {/* {contextHolder} */}
        </Content>
        {isLoading ?? <Loading />}
      </Layout>
    </SideBarTemplate>
  );
}
