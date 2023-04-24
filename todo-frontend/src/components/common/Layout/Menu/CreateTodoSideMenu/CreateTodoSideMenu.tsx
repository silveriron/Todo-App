import React from "react";
import ArrowBack from "./icons/ArrowBack";
import { useRecoilState } from "recoil";
import { createTodoMenuState } from "@/store/atoms/createTodoMenuState";
import StatusContainer from "@/components/todo/Create/StatusContainer/StatusContainer";
import NameContainer from "@/components/todo/Create/NameContainer/NameContainer";

const CreateTodoSideMenu = () => {
  const [isCreateTodoMenu, setIsCreateTodo] =
    useRecoilState(createTodoMenuState);

  const w = isCreateTodoMenu ? "w-[40%]" : "w-[0px]";

  const toggleCreateTodoMenu = () => {
    setIsCreateTodo(!isCreateTodoMenu);
  };

  return (
    <div
      className={`${w} h-screen overflow-hidden bg-neutral-50 border-l border-[#f3f3f3]`}
      style={{
        boxShadow: "0px 1px 2px 0 rgba(0,0,0,0.2)",
        transition: "width ease 0.3s",
      }}
    >
      <div className="p-3">
        <button onClick={toggleCreateTodoMenu}>
          <ArrowBack />
        </button>
        <form className="m-12">
          <div className="pb-6 flex flex-col gap-2 border-b border-[#e0e0e0]">
            <input
              className=" text-[2.5rem] outline-none font-bold placeholder:text-[#E1E1E0] placeholder:font-bold"
              placeholder="제목 없음"
            />
            <StatusContainer />
            <NameContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoSideMenu;
