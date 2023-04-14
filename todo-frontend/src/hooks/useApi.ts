import { createTodo, getTodos, signIn, signUp, updataTodo } from "@/lib/api";
import { CreateTodoDto, updateTodoDto } from "@/types/todo";
import { UserDto } from "@/types/user";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const useApi = () => {
  const toast = useToast();
  const router = useRouter();

  const signUphandler = async (data: UserDto) => {
    try {
      const res = await signUp(data);

      if (res.status === 201) {
        router.push("/signin");
      }
    } catch (error: any) {
      const title = error.response.data.message;
      toast({
        title: title,
        status: "error",
        duration: 3000,
      });
    }
  };

  const signInhandler = async (data: UserDto) => {
    try {
      const res = await signIn(data);

      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        router.push("/todo");
      }
    } catch (error: any) {
      const title = error.response.data.message;
      toast({
        title: title,
        status: "error",
        duration: 3000,
      });
    }
  };

  const getTodosHandler = async () => {
    try {
      const res = await getTodos();
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: any) {
      const title = error.response.data.message;
      toast({
        title: title,
        status: "error",
        duration: 3000,
      });
    }
  };

  const createTodoHandler = async (data: CreateTodoDto) => {
    try {
      const res = await createTodo(data);
      if (res.status === 201) {
        return res.data;
      }
    } catch (error: any) {
      const title = error.response.data.message;
      toast({
        title: title,
        status: "error",
        duration: 3000,
      });
    }
  };

  const updataTodoHandler = async (id: number, data: updateTodoDto) => {
    try {
      const res = await updataTodo(id, data);
      if (res.status === 201) {
        return res;
      }
    } catch (error: any) {
      const title = error.response.data.message;
      toast({
        title: title,
        status: "error",
        duration: 3000,
      });
    }
  };

  return {
    signUphandler,
    signInhandler,
    getTodosHandler,
    createTodoHandler,
    updataTodoHandler,
  };
};

export default useApi;
