import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Todo } from "@/types/todo";
import useApi from "@/hooks/useApi";
import TodoInput from "@/components/Todo/TodoInput";
import TodoItem from "@/components/Todo/TodoItem";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const router = useRouter();
  const { getTodosHandler } = useApi();

  const refreshTodos = useCallback(async () => {
    const todos = await getTodosHandler();
    setTodos(todos);
  }, [getTodosHandler]);

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/signin");
      } else {
        refreshTodos();
      }
    }
  }, [refreshTodos, router]);

  return (
    <main className="h-5/6">
      <h1 className="text-center mb-10 text-3xl font-bold">Todos</h1>
      <TodoInput refreshTodos={refreshTodos} />
      <ul className="flex flex-col gap-5">
        {todos?.map((todo) => (
          <TodoItem refreshTodos={refreshTodos} key={todo.id} data={todo} />
        ))}
      </ul>
    </main>
  );
};

export default TodoPage;
