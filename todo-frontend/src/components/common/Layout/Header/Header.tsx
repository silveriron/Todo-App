import React from "react";
import MenuButton from "./MenuButton";
import BigText from "../../typography/BigText";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-10 flex gap-3 items-center">
      <MenuButton />
      <Link href="/todo">
        <BigText>할일 목록</BigText>
      </Link>
    </header>
  );
};

export default Header;
