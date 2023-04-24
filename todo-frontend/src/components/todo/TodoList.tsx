import React from "react";
import BigText from "../common/typography/BigText";
import StatusBox from "./StatusBox";
import { Status } from "@/types/status";

const TodoList = () => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type={Status.TODO}>
        <BigText>Todo</BigText>
      </StatusBox>
    </section>
  );
};

export default TodoList;
