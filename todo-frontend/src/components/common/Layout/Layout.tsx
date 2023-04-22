import React from "react";
import SideMenu from "./Menu/SideMenu/SideMenu";
import { Props } from "@/types/props";
import CreateTodoSideMenu from "./Menu/CreateTodoSideMenu/CreateTodoSideMenu";

const Layout = ({ children }: Props) => {
  return (
    <main className="flex w-screen">
      <SideMenu />
      {children}
      <CreateTodoSideMenu />
    </main>
  );
};

export default Layout;
