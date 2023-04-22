import React from "react";
import BigText from "../common/typography/BigText";
import { useRecoilState } from "recoil";
import { createTodoMenuState } from "@/store/atoms/createTodoMenuState";

const CreateButton = () => {
  const [isCreateTodoMenu, setIsCreateTodoMenu] =
    useRecoilState(createTodoMenuState);

  const toggleCreateTodoMenu = () => {
    setIsCreateTodoMenu(true);
  };

  return (
    <button
      onClick={toggleCreateTodoMenu}
      className="w-[75px] h-[30px] rounded bg-[#4281db] mb-1"
    >
      <BigText className="text-bg-white text-center">New</BigText>
    </button>
  );
};

export default CreateButton;
