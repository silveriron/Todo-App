import React from "react";
import BigText from "../common/typography/BigText";
import StatusBox from "./StatusBox";

const TodoList = () => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type="todo">
        <BigText>Todo</BigText>
      </StatusBox>
    </section>
  );
};

export default TodoList;
