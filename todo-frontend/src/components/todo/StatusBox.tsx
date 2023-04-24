import { Props } from "@/types/props";
import { Status } from "@/types/status";
import React from "react";

interface StatusBoxProps extends Props {
  type: Status;
}

const todoStyle =
  "w-[100px] h-[25px] pl-3 flex gap-3 items-center rounded-[50px] bg-todo-color";
const inProgressStyle =
  "w-[130px] h-[25px] pl-3 flex gap-3 items-center rounded-[50px] bg-doing-color";
const doneStyle =
  "w-[100px] h-[25px] pl-3 flex gap-3 items-center rounded-[50px] bg-done-color";

const todoColor = "#91918E";
const doingColor = "#6995B9";
const doneColor = "#769A7F";

const StatusBox = ({ children, type }: StatusBoxProps) => {
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
        className="w-[13px] h-[13px] "
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="6.5"
          cy="6.5"
          r="6.5"
          fill={
            type === Status.TODO
              ? todoColor
              : type === Status.IN_PROGRESS
              ? doingColor
              : doneColor
          }
        />
      </svg>
      {children}
    </div>
  );
};

export default StatusBox;
