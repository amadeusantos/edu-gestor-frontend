import { Layout, Table, TableColumnsType, Tag } from "antd";
import { Title } from "../../ions";
import { ProfessorMinimalSchema } from "../../../services/activities.service";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Content } from "antd/es/layout/layout";

type DisciplineColumns = {
  id: string;
  name: string;
  professor: ProfessorMinimalSchema;
  faults: number;
  classes: number;
  average_grade: number;
};
const columns: TableColumnsType<DisciplineColumns> = [
  {
    title: "Disciplina",
    dataIndex: "name",
  },
  {
    title: "professor",
    dataIndex: "professor",
    render: (professor: ProfessorMinimalSchema) => professor.fullname,
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
  return (
    <SideBarTemplate>
      <Layout style={{ padding: "1rem" }}>
        <Title>Disciplinas</Title>
        <Content style={{ padding: "1rem 0"}}>
          <Table<DisciplineColumns>
            pagination={{
              position: ["bottomCenter"],
              onChange: () => {},
              total: 100,
              pageSize: 10,
              showSizeChanger: false,
            }}
            columns={columns}
            dataSource={[
              {
                id: "aajf",
                name: "mathamtica",
                average_grade: 8.576,
                classes: 32,
                faults: 24,
                professor: { id: "23", fullname: "amadeu" },
              },
            ]}
            size="large"
          />
        </Content>
      </Layout>
    </SideBarTemplate>
  );
}
