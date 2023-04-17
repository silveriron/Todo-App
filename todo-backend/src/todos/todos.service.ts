import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOneBy({ id });
  }

  create({
    title,
    content,
    user,
  }: {
    title: string;
    content: string;
    user: User;
  }): Promise<Todo> {
    const newTodo = this.todosRepository.create({
      title,
      content,
      isCompleted: false,
      user,
    });

    return this.todosRepository.save(newTodo);
  }
}
