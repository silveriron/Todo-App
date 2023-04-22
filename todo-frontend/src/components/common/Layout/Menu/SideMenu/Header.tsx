import React from "react";
import ArrowBack from "./icons/ArrowBack";
import Text from "../../../typography/Text";
import { useRecoilState } from "recoil";
import { menuState } from "@/store/atoms/menuState";

const Header = () => {
  const [isMenu, setIsMenu] = useRecoilState(menuState);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div className="flex justify-between items-center">
      <Text>은과철의 할일 목록</Text>
      <button
        onClick={toggleMenu}
        className="hover:bg-todo-color rounded-md p-0.5"
      >
        <ArrowBack />
      </button>
    </div>
  );
};

export default Header;
