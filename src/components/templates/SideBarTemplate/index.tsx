import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import { Chalkboard, SignOut, Student, User, Users } from "phosphor-react";
import { Link, useLocation } from "react-router";
import { useLogout } from "../../../store/auth.store";

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

export function SideBarTemplate({ children }: SideBarTemplateProps) {
  const { mutate: logout } = useLogout();
  const { pathname } = useLocation();
  const select = pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState(false);

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
    // getItem("Cursos", "4", <Star />),
    // getItem("Disciplinas", "6", <Star />),
    getItem(
      "",
      "",
      <Button type="link" onClick={() => logout()}>
        <SignOut /> Logout
      </Button>
    ),
  ];

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
          items={items}
        />
      </Sider>
      {children}
    </Layout>
  );
}
