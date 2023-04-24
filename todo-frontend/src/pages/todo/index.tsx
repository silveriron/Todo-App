import React from "react";
import { getTodos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/common/Layout/Header/Header";
import Title from "@/components/common/typography/Title";
import Line from "@/components/todo/Line";
import TodoList from "@/components/todo/TodoList";
import DoingList from "@/components/todo/DoingList";
import DoneList from "@/components/todo/DoneList";
import CreateButton from "@/components/todo/CreateButton";

const Index = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

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
        <TodoList />
        <DoingList />
        <DoneList />
      </div>
    </main>
  );
};

export default Index;
