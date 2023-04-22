import React from "react";
import SideMenu from "../Menu/SideMenu/SideMenu";
import { Props } from "@/types/props";

const Layout = ({ children }: Props) => {
  return (
    <main className="flex w-full">
      <SideMenu />
      {children}
    </main>
  );
};

export default Layout;
