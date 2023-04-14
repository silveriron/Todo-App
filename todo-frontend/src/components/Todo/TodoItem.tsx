import { useState } from "react";
import { Todo } from "../../types/todo";
import useApi from "../../hooks/useApi";
import useInput from "../../hooks/useInput";
import { deleteTodo } from "../../lib/api";

interface TodoItemProps {
  data: Todo;
  refreshTodos: () => void;
}

const TodoItem = ({ data, refreshTodos }: TodoItemProps) => {
  const { isCompleted, todo, id } = data;
  const [isComplete, setIsComplete] = useState(isCompleted);
  const [isModify, setIsModify] = useState(false);
  const { updataTodoHandler } = useApi();
  const { value: newTodo, onChange: onChangeNewTodo } = useInput({
    init: todo,
  });

  const completeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    await updataTodoHandler(id, { isCompleted: checked, todo });
    setIsComplete(checked);
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await updataTodoHandler(id, { isCompleted, todo: newTodo });
    refreshTodos();
    setIsModify((prev) => !prev);
  };

  const deleteHandler = async () => {
    const isDelete = global.confirm("정말 삭제하시겠습니까?");

    if (!isDelete) return;

    await deleteTodo(id);
    refreshTodos();
  };

  const toggleModify = () => {
    setIsModify((prev) => !prev);
  };

  return (
    <li className="flex gap-5">
      <label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={completeHandler}
          className="mr-2"
        />
        {isModify ? (
          <input
            data-testid="modify-input"
            className="w-52 border-2 border-slate-900 rounded-md"
            type="text"
            value={newTodo}
            onChange={onChangeNewTodo}
          />
        ) : (
          <span className="w-52 inline-block">{todo}</span>
        )}
      </label>
      {isModify ? (
        <button
          data-testid="submit-button"
          className="hover:bg-slate-500 hover:text-white px-2 py-1 rounded"
          onClick={submitHandler}
        >
          제출
        </button>
      ) : (
        <button
          data-testid="modify-button"
          className="hover:bg-slate-500 hover:text-white px-2 py-1 rounded"
          onClick={toggleModify}
        >
          수정
        </button>
      )}
      <button
        data-testid="delete-button"
        className="hover:bg-red-600 hover:text-white px-2 py-1 rounded"
        onClick={deleteHandler}
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
