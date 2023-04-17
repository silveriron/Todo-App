import { Todo } from '../todos/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  refresh_token: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
