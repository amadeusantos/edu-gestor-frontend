import { Link, useParams } from "react-router";
import { useListFrequencies } from "../../../store/frequencies.store";
import { useState } from "react";
import { Button, Layout, Table, TableColumnsType } from "antd";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import { Content } from "antd/es/layout/layout";
import { FrequencySchema } from "../../../services/frequencies.service";
import dayjs from "dayjs";
import { Loading } from "../../molecules/Loading";
import { useFindDiscipline } from "../../../store/disciplines.store";

// const config = {
//   title: "Remover da Frequência",
//   content: "Deseja remover esse data da frequência?",
// };

export function Frequency() {
  const { disciplineId } = useParams();
  const [page, setPage] = useState(1);
  const { data: discipline } = useFindDiscipline(disciplineId!);
  const { data, isLoading } = useListFrequencies(page, 10, disciplineId);
  //   const { mutate: deleteFequency } = useDeleteFrequency();
  //   const [modal, contextHolder] = Modal.useModal();
  //   const openModalDelete = (id: string) => {
  //     const actionDelete = () => deleteFequency(id);

  //     modal.confirm({ ...config, onOk: actionDelete });
  //   };

  const columns: TableColumnsType<FrequencySchema> = [
    {
      title: "Data",
      dataIndex: "date",
      render: (value, record) => (
        <Link
          to={`/disciplines/${disciplineId}/frequencies/${record.id}/${record.discipline.classroom_id}`}
        >
          {dayjs(value).format("DD/MM/YYYY")}
        </Link>
      ),
    },
    {
      title: "Número de Presentes",
      dataIndex: "presents",
      render: (value) => value.length,
    },
  ];

  return (
    <SideBarTemplate>
      <Layout style={{ padding: "1rem" }}>
        <Title>Frequências de {discipline?.name}</Title>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          <Link
            to={`/disciplines/${disciplineId}/frequencies/new/${discipline?.classroom_id}`}
          >
            <Button type="primary" size="large">
              Adicionar Frequência
            </Button>
          </Link>
        </div>

        <Content>
          <Table<FrequencySchema>
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
