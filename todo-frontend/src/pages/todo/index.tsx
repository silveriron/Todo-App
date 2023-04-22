import React from "react";
import { getTodos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/common/header/Header";
import Title from "@/components/common/typography/Title";
import Line from "@/components/todo/Line";
import TodoList from "@/components/todo/TodoList";
import DoingList from "@/components/todo/DoingList";
import DoneList from "@/components/todo/DoneList";

const Index = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="px-[8.3%]">
      <Header />
      <main className="mt-16">
        <Title className="mb-3">할일 목록</Title>
        <Line />
        <div className="flex gap-5">
          <TodoList />
          <DoingList />
          <DoneList />
        </div>
      </main>
    </div>
  );
};

export default Index;
