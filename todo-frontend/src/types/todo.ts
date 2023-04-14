export interface CreateTodoDto {
  todo: string;
}

export interface updateTodoDto {
  todo: string;
  isCompleted: boolean;
}

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
