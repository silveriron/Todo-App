import React from "react";
import StatusBox from "./StatusBox";
import { Status } from "@/types/status";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem/TodoItem";

interface InProgressListProps {
  items: Todo[] | undefined;
}

const InProgressList = ({ items }: InProgressListProps) => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type={Status.IN_PROGRESS} />
      <ul>
        {items?.map((todo) => (
          <TodoItem key={todo.id} item={todo} />
        ))}
      </ul>
    </section>
  );
};

export default InProgressList;
