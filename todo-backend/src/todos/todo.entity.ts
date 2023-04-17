import { User } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn()
  user: User;
}
