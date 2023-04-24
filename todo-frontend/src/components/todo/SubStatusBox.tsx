import { Props } from "@/types/props";
import { Status } from "@/types/status";
import React from "react";
import Text from "../common/typography/Text";

interface SubStatusBox extends Props {
  type: Status;
}

const todoStyle =
  "w-[100px] h-5 pl-3 flex gap-3 items-center rounded-[50px] bg-todo-color hover:cursor-pointer";
const inProgressStyle =
  "w-[140px] h-5 pl-3 flex gap-3 items-center rounded-[50px] bg-doing-color hover:cursor-pointer";
const doneStyle =
  "w-[100px] h-5 pl-3 flex gap-3 items-center rounded-[50px] bg-done-color hover:cursor-pointer";

const todoColor = "#91918E";
const doingColor = "#6995B9";
const doneColor = "#769A7F";

const SubStatusBox = ({ type }: SubStatusBox) => {
  const text =
    type === Status.TODO
      ? "Todo"
      : type === Status.IN_PROGRESS
      ? "In progress"
      : "Done";

  return (
    <div
      className={
        type === Status.TODO
          ? todoStyle
          : type === Status.IN_PROGRESS
          ? inProgressStyle
          : doneStyle
      }
    >
      <svg
        className="w-[10px] h-[10px] "
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="5"
          cy="5"
          r="5"
          fill={
            type === Status.TODO
              ? todoColor
              : type === Status.IN_PROGRESS
              ? doingColor
              : doneColor
          }
        />
      </svg>
      <Text>{text}</Text>
    </div>
  );
};

export default SubStatusBox;
