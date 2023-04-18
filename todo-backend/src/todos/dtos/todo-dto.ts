import { Expose, Transform } from 'class-transformer';

export class TodoDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  content: string;
  @Expose()
  isStatus: 'todo' | 'doing' | 'done';
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
