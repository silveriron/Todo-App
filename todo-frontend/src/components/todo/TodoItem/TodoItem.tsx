import BigText from "@/components/common/typography/BigText";
import React from "react";
import SubStatusBox from "../SubStatusBox";
import { Status } from "@/types/status";
import Text from "@/components/common/typography/Text";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li className="h-20 rounded border mt-2 pt-4 pl-3 border-[#e0e0e0] shadow">
      <BigText className="mb-2 font-bold">{todo.title}</BigText>
      <SubStatusBox type={todo.isStatus} />
    </li>
  );
};

export default TodoItem;
