import { Button, CalendarProps, Layout, Tag } from "antd";
import { Title } from "../../ions";
import * as S from "./style";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { ActivitySchema } from "../../../services/activities.service";
import { ActivityDrawer } from "../../molecules/ActivityDrawer";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { useListActivities } from "../../../store/activities.store";
import { Loading } from "../../molecules/Loading";
import { Link } from "react-router";
import { useUser } from "../../../store/auth.store";
import "dayjs/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";
const dateCheck = (date1: dayjs.ConfigType, date2: dayjs.ConfigType) => {
  const date_1 = dayjs(date1);
  return (
    date_1.isSame(date2, "year") &&
    date_1.isSame(date2, "month") &&
    date_1.isSame(date2, "date")
  );
};

const getDates = (dateNew: dayjs.Dayjs) => {
  const dayOne = dateNew.subtract(dateNew.date(), "days");
  const gte = dayOne.subtract(dayOne.day() + 1, "days");
  const lte = gte.add(42, "days");
  return [gte, lte];
};

export function Agenda() {
  const { data: user } = useUser();
  const [dates, setDates] = useState(getDates(dayjs()));
  const [gte, lte] = dates;
  const { data, isLoading } = useListActivities(
    gte.toISOString(),
    lte.toISOString()
  );
  const [activity, setActivity] = useState<ActivitySchema | null>(null);

  const setDate = (date: dayjs.Dayjs) => setDates(getDates(date));

  if (isLoading) {
    <Loading />;
  }

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (date) => {
    return (
      <ul className="events">
        {data &&
          data
            .filter((act) => dateCheck(date, act.date))
            .map((item) => (
              <li key={item.id} onClick={() => setActivity(item)}>
                <Tag color="blue-inverse">{item.title}</Tag>
              </li>
            ))}
      </ul>
    );
  };
  const onCloseDrawer = () => {
    setActivity(null);
  };
  return (
    <SideBarTemplate>
      <Layout style={{ padding: "1rem" }}>
        <Title>Agenda</Title>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "end" }}>
          {user &&
            ["PROFESSOR", "ADMIN", "COORDINATOR"].includes(user?.role) && (
              <Link to="/agenda/new">
                <Button type="primary" size="large">
                  Adicionar Atividade
                </Button>
              </Link>
            )}
        </div>
        <S.Calendar
          style={{ padding: "2em" }}
          cellRender={cellRender}
          onChange={setDate}
          locale={locale}
        />
        <ActivityDrawer
          activity={activity}
          onCloseDrawer={onCloseDrawer}
          open={!!activity}
          type="readonly"
        />
      </Layout>
    </SideBarTemplate>
  );
}
