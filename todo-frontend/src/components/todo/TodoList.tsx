import React from "react";
import StatusBox from "./StatusBox";
import { Status } from "@/types/status";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem/TodoItem";

interface TodoListProps {
  items: Todo[] | undefined;
}

const TodoList = ({ items }: TodoListProps) => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type={Status.TODO} />
      <ul>
        {items?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
