import React from "react";
import ArrowBack from "./icons/ArrowBack";
import Text from "../../../typography/Text";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuState } from "@/store/atoms/menuState";
import { User } from "@/store/atoms/User";

const Header = () => {
  const user = useRecoilValue(User);
  const [isMenu, setIsMenu] = useRecoilState(menuState);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  console.log(user);

  return (
    <div className="flex justify-between items-center">
      <Text>{`${user.userName && `홍길동`}의 할일 목록`}</Text>
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
