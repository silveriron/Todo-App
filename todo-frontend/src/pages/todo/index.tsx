import React from "react";
import { getTodos } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import Title from "@/components/common/typography/Title";
import Line from "@/components/todo/Line";
import TodoList from "@/components/todo/TodoList";
import InProgressList from "@/components/todo/InProgressList";
import DoneList from "@/components/todo/DoneList";
import CreateButton from "@/components/todo/CreateButton";
import { Status } from "@/types/status";

const Index = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const todo = data?.filter((todo) => todo.isStatus === Status.TODO);

  const inprogress = data?.filter(
    (todo) => todo.isStatus === Status.IN_PROGRESS
  );

  const done = data?.filter((todo) => todo.isStatus === Status.DONE);

  if (isLoading) return <></>;
  if (isError) return <div>Error</div>;

  return (
    <main className="w-full mt-16 px-[8.3%]">
      <Title className="mb-3">할일 목록</Title>
      <div className="w-full flex justify-end">
        <CreateButton />
      </div>
      <Line />
      <div className="flex gap-5">
        <TodoList items={todo} />
        <InProgressList items={inprogress} />
        <DoneList items={done} />
      </div>
    </main>
  );
};

export default Index;
