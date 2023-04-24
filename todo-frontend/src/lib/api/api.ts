import { CreateTodoDto, Todo, UpdateTodoDto } from "@/types/todo";
import { UserDto } from "@/types/user";
import axios from "axios";

if (process.env.NEXT_PUBLIC_API_URL === undefined) {
  throw new Error("API_URL이 필요합니다.");
}

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const signUp = async (data: UserDto) => {
  return await instance.post("/auth/signup", data);
};

export const signIn = async (data: UserDto) => {
  return await instance.post("/auth/signin", data);
};

export const signOut = async () => {
  return await instance.post("/auth/signout");
};

export const getAccessToken = async () => {
  return await instance.post("/auth/refresh");
};

export const createTodo = async (data: CreateTodoDto) => {
  return await instance.post<Todo>("/todos", data);
};

export const getTodos = async () => {
  const res = await instance.get<Todo[]>("/todos");
  return res.data;
};

export const updataTodo = async (id: number, data: UpdateTodoDto) => {
  return await instance.put<Todo>(`/todos/${id}`, data);
};

export const deleteTodo = async (id: number) => {
  return await instance.delete(`/todos/${id}`);
};
