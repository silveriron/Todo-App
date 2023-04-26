import React from "react";
import StatusBox from "./StatusBox";
import { Status } from "@/types/status";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem/TodoItem";

interface DoneListProps {
  items: Todo[] | undefined;
}

const DoneList = ({ items }: DoneListProps) => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type={Status.DONE} />
      <ul>
        {items?.map((todo) => (
          <TodoItem key={todo.id} item={todo} />
        ))}
      </ul>
    </section>
  );
};

export default DoneList;
