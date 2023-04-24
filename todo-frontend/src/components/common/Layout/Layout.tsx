import React from "react";
import SideMenu from "./Menu/SideMenu/SideMenu";
import { Props } from "@/types/props";
import CreateTodoSideMenu from "./Menu/CreateTodoSideMenu/CreateTodoSideMenu";
import Header from "./Header/Header";

const Layout = ({ children }: Props) => {
  return (
    <main className="flex w-screen">
      <SideMenu />
      <div className="w-full px-[2%]">
        <Header />
        {children}
      </div>
      <CreateTodoSideMenu />
    </main>
  );
};

export default Layout;
