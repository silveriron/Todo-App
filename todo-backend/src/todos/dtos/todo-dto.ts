import { Expose } from 'class-transformer';

export class TodoDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  content: string;
  @Expose()
  isStatus: 'todo' | 'doing' | 'done';
  @Expose()
  userId: number;
}
