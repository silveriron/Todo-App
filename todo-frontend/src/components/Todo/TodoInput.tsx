import React from "react";
import useInput from "../../hooks/useInput";
import useApi from "../../hooks/useApi";

const TodoInput = ({ refreshTodos }: { refreshTodos: () => void }) => {
  const { value, onChange } = useInput({});
  const { createTodoHandler } = useApi();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodoHandler({ todo: value });
    refreshTodos();
  };

  return (
    <form onSubmit={onSubmit} className="flex mb-10 gap-10">
      <input
        className="border-slate-900 border-2 rounded-md"
        data-testid="new-todo-input"
        value={value}
        onChange={onChange}
      />
      <button
        className="bg-slate-900 text-white px-10 rounded"
        data-testid="new-todo-add-button"
      >
        추가
      </button>
    </form>
  );
};

export default TodoInput;
