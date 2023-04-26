import React, { useEffect, useState } from "react";
import ArrowBack from "./icons/ArrowBack";
import { useRecoilState, useRecoilValue } from "recoil";
import { createTodoMenuState } from "@/store/atoms/createTodoMenuState";
import StatusContainer from "@/components/todo/Create/StatusContainer/StatusContainer";
import NameContainer from "@/components/todo/Create/NameContainer/NameContainer";
import { FormProvider, useForm } from "react-hook-form";
import { Todo } from "@/store/atoms/Todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateTodo } from "@/lib/api/api";

const Editor = React.lazy(
  () => import("@/components/todo/Create/Editor/Editor")
);

const CreateTodoSideMenu = () => {
  const methods = useForm();
  const [init, setInit] = useState(false);
  const todo = useRecoilValue(Todo);
  const [isCreateTodoMenu, setIsCreateTodo] =
    useRecoilState(createTodoMenuState);
  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  const { mutate: updateMutate } = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  useEffect(() => {
    if (window) {
      setInit(true);
    }
    methods.setValue("title", todo.title);
  }, [methods, todo.title]);

  const w = isCreateTodoMenu ? "w-[40%]" : "w-[0px]";

  const toggleCreateTodoMenu = () => {
    setIsCreateTodo(!isCreateTodoMenu);
  };

  const onSubmit = (data: any) => {
    const { title } = data;
    const { content, isStatus, id } = todo;

    console.log(title, content, isStatus, id);

    if (id > 0) {
      updateMutate({ id, title, content, isStatus });
    } else {
      createMutate({ title, content, isStatus });
    }
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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="m-12">
            <div className="pb-6 flex flex-col gap-2 border-b border-[#e0e0e0]">
              <input
                className=" text-[2.5rem] outline-none font-bold placeholder:text-[#E1E1E0] placeholder:font-bold"
                placeholder="제목 없음"
                {...methods.register("title")}
              />
              <StatusContainer />
              {/* <NameContainer /> */}
            </div>
            {init && <Editor />}
            <button>{todo.id > 0 ? "수정" : "저장"}</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateTodoSideMenu;
