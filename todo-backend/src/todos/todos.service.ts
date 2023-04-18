import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    const todo = this.todosRepository.findOneBy({ id });

    if (!todo) {
      throw new BadRequestException('todo를 찾을 수 없습니다.');
    }

    return todo;
  }

  findByUserId(userId: number): Promise<Todo[]> {
    const todos = this.todosRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
    });

    return todos;
  }

  create({
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
    return this.todosRepository.save(newTodo);
  }

  delete(id: number) {
    return this.todosRepository.delete(id);
  }

  update(todo: Todo) {
    return this.todosRepository.update(todo.id, todo);
  }
}
