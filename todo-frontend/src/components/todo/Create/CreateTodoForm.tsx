import { createTodo, updateTodo } from "@/lib/api/api";
import { Todo } from "@/store/atoms/Todo";
import { Status } from "@/types/status";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import StatusContainer from "./StatusContainer/StatusContainer";

const Editor = React.lazy(
  () => import("@/components/todo/Create/Editor/Editor")
);

const CreateTodoForm = () => {
  const [init, setInit] = useState(false);
  const [todo, setTodo] = useRecoilState(Todo);
  const methods = useForm();

  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTodo({
        id: 0,
        title: "",
        content: "",
        isStatus: Status.TODO,
        userId: 0,
      });
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

  const onSubmit = (data: any) => {
    const { title } = data;
    const { content, isStatus, id } = todo;

    if (id > 0) {
      updateMutate({ id, title, content, isStatus });
    } else {
      createMutate({ title, content, isStatus });
    }
  };

  return (
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
  );
};

export default CreateTodoForm;
