import { Expose } from 'class-transformer';
import { Todo } from 'src/todos/todo.entity';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  userName: string;
  @Expose()
  email: string;
  @Expose()
  todos: Todo[];
}
