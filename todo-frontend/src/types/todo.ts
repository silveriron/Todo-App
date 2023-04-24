import { Status } from "./status";

export interface Todo {
  id: number;
  title: string;
  content: string;
  isStatus: Status;
  userId: number;
}

export interface CreateTodoDto {
  title: string;
  content: string;
  isStatus: Status;
}

export interface UpdateTodoDto {
  title?: string;
  content?: string;
  isStatus?: Status;
}
