import React from "react";
import BigText from "../common/typography/BigText";
import { useRecoilState } from "recoil";
import { createTodoMenuState } from "@/store/atoms/createTodoMenuState";
import { Todo } from "@/store/atoms/Todo";
import { Status } from "@/types/status";

const CreateButton = () => {
  const [todo, setTodo] = useRecoilState(Todo);
  const [isCreateTodoMenu, setIsCreateTodoMenu] =
    useRecoilState(createTodoMenuState);

  const toggleCreateTodoMenu = () => {
    setTodo({
      id: 0,
      title: "",
      content: "",
      isStatus: Status.TODO,
      userId: 0,
    });
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
