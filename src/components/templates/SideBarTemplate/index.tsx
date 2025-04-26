import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  Books,
  Calendar,
  Chalkboard,
  SignOut,
  Student,
  User,
  Users,
} from "phosphor-react";
import { Link, useLocation } from "react-router";
import { useLogout, useUser } from "../../../store/auth.store";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface SideBarTemplateProps {
  children: React.ReactElement;
}

const items: MenuItem[] = [
  getItem(
    "Usuários",
    "users",
    <Link to={{ pathname: "/users" }}>
      <Users />
    </Link>
  ),
  getItem(
    "Alunos",
    "students",
    <Link to={{ pathname: "/students" }}>
      <Student />
    </Link>
  ),
  getItem(
    "Professores",
    "professors",
    <Link to={{ pathname: "/professors" }}>
      <User />
    </Link>
  ),
  getItem(
    "Turmas",
    "classrooms",
    <Link to={{ pathname: "/classrooms" }}>
      <Chalkboard />
    </Link>
  ),
  getItem(
    "Disciplinas",
    "disciplines",
    <Link to={{ pathname: "/disciplines" }}>
      <Books />
    </Link>
  ),
  getItem(
    "Agenda",
    "agenda",
    <Link to={{ pathname: "/agenda" }}>
      <Calendar />
    </Link>
  ),
];

const getItems = (role?: string) => {
  switch (role) {
    case "ADMIN":
      return items;
    case "COORDINATOR":
      return items.slice(1)
    case "PROFESSOR":
      return items.slice(4)
    case "STUDENT":
      return items.slice(4)
    case "RESPONSIBLE":
      return items.slice(4)
    default:
      return []
  }
};

export function SideBarTemplate({ children }: SideBarTemplateProps) {
  const { mutate: logout } = useLogout();
  const { data: user } = useUser();
  const { pathname } = useLocation();
  const select = pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: "100vh", width: "100vw" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[select]}
          mode="inline"
          items={[
            ...getItems(user?.role),
            {
              key: "logout",
              onClick: () => logout(),
              label: "Logout",
              icon: <SignOut />,
            },
          ]}
        />
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  );
}
