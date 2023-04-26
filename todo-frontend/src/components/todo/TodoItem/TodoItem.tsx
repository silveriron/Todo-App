import BigText from "@/components/common/typography/BigText";
import React, { useState } from "react";
import SubStatusBox from "../SubStatusBox";
import { Todo as TodoType } from "@/types/todo";
import { useRecoilState } from "recoil";
import { createTodoMenuState } from "@/store/atoms/createTodoMenuState";
import { Todo } from "@/store/atoms/Todo";
import Text from "@/components/common/typography/Text";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/lib/api/api";

interface TodoItemProps {
  item: TodoType;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const [isShowButton, setIsShowButton] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isTodoMenuState, setIsTodoMenuState] =
    useRecoilState(createTodoMenuState);
  const [todo, setTodo] = useRecoilState(Todo);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteTodo, {
    onSuccess: () => {
      setIsShowMenu(false);
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const updateHandler = () => {
    setIsTodoMenuState(true);
    setTodo(item);
  };

  const showButtonHandler = () => {
    setIsShowButton(true);
  };

  const hideButtonHandler = () => {
    setIsShowButton(false);
  };

  const toggleMenuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShowMenu(!isShowMenu);
  };

  const deleteTodoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate(item.id);
  };

  return (
    <li
      onClick={updateHandler}
      onMouseEnter={showButtonHandler}
      onMouseLeave={hideButtonHandler}
      className="h-20 rounded border mt-2 pt-4 pl-3 relative border-[#e0e0e0] shadow hover:cursor-pointer hover:bg-[#F4F4F4] "
    >
      {isShowButton && (
        <div className="w-6 h-6 flex justify-center items-center rounded absolute bg-[#ffffff] right-4 bg-neutral-50 border border-[#e0e0e0] hover:bg-[#F4F4F4]">
          <button onClick={toggleMenuHandler}>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 "
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.00004 8.33325C4.08337 8.33325 3.33337 9.08325 3.33337 9.99992C3.33337 10.9166 4.08337 11.6666 5.00004 11.6666C5.91671 11.6666 6.66671 10.9166 6.66671 9.99992C6.66671 9.08325 5.91671 8.33325 5.00004 8.33325ZM15 8.33325C14.0834 8.33325 13.3334 9.08325 13.3334 9.99992C13.3334 10.9166 14.0834 11.6666 15 11.6666C15.9167 11.6666 16.6667 10.9166 16.6667 9.99992C16.6667 9.08325 15.9167 8.33325 15 8.33325ZM8.33337 9.99992C8.33337 9.08325 9.08337 8.33325 10 8.33325C10.9167 8.33325 11.6667 9.08325 11.6667 9.99992C11.6667 10.9166 10.9167 11.6666 10 11.6666C9.08337 11.6666 8.33337 10.9166 8.33337 9.99992Z"
                fill="#6D7D8B"
              />
            </svg>
          </button>
          {isShowMenu && (
            <div className="w-[60px] h-6 absolute flex flex-col items-center justify-center top-3 left-1/2 rounded bg-[#fff] z-50 shadow">
              <button
                onClick={deleteTodoHandler}
                className="flex gap-2 items-center"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 relative"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M2 4H3.33333H14"
                    stroke="#808080"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.33337 3.99992V2.66659C5.33337 2.31296 5.47385 1.97382 5.7239 1.72378C5.97395 1.47373 6.31309 1.33325 6.66671 1.33325H9.33337C9.687 1.33325 10.0261 1.47373 10.2762 1.72378C10.5262 1.97382 10.6667 2.31296 10.6667 2.66659V3.99992M12.6667 3.99992V13.3333C12.6667 13.6869 12.5262 14.026 12.2762 14.2761C12.0261 14.5261 11.687 14.6666 11.3334 14.6666H4.66671C4.31309 14.6666 3.97395 14.5261 3.7239 14.2761C3.47385 14.026 3.33337 13.6869 3.33337 13.3333V3.99992H12.6667Z"
                    stroke="#808080"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66663 7.33325V11.3333"
                    stroke="#808080"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33337 7.33325V11.3333"
                    stroke="#808080"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Text>삭제</Text>
              </button>
            </div>
          )}
        </div>
      )}
      <BigText className="mb-2 font-bold">{item.title}</BigText>
      <SubStatusBox type={item.isStatus} />
    </li>
  );
};

export default TodoItem;
