import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todosRepository.findOneBy({ id });
  }

  async create({
    title,
    content,
    userId,
  }: {
    title: string;
    content: string;
    userId: number;
  }): Promise<Todo> {
    const newTodo = this.todosRepository.create({
      title,
      content,
      user: { id: userId },
      isStatus: 'todo',
    });
    return await this.todosRepository.save(newTodo);
  }
}
