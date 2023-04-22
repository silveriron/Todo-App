import React from "react";
import ArrowBack from "../icons/ArrowBack";
import Text from "../../typography/Text";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Text>은과철의 할일 목록</Text>
      <button className="hover:bg-todo-color rounded-md p-0.5">
        <ArrowBack />
      </button>
    </div>
  );
};

export default Header;
