import { Layout, Table, TableColumnsType, Tag } from "antd";
import { Title } from "../../ions";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Content } from "antd/es/layout/layout";
import { useListStudentsInfo } from "../../../store/students-info.store";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { StudentInfoSchema } from "../../../services/students-info.service";

const columns: TableColumnsType<StudentInfoSchema> = [
  {
    title: "Disciplina",
    dataIndex: "discipline_name",
  },
  {
    title: "professor",
    dataIndex: "professor_name",
  },
  { title: "Faltas", dataIndex: "faults" },
  { title: "Aulas", dataIndex: "classes" },
  {
    title: "Faltas/Aula",
    render(_, record) {
      return (
        <Tag
          color={record.faults / record.classes >= 0.75 ? "success" : "error"}
        >
          {`${record.faults} / ${record.classes}`}
        </Tag>
      );
    },
  },
  {
    title: "Média",
    dataIndex: "average_grade",
    render: (average_grade: number) => (
      <Tag color={average_grade > 7 ? "success" : "error"}>
        {average_grade.toFixed(2)}
      </Tag>
    ),
  },
];

export function DisciplineStudent() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const studentId = searchParams.get("studentId");
  const { data, isLoading } = useListStudentsInfo(page, 10, studentId);
  return (
    <SideBarTemplate>
      <Layout style={{ padding: "1rem" }}>
        <Title>Disciplinas</Title>
        <Content style={{ padding: "1rem 0" }}>
          <Table<StudentInfoSchema>
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
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
