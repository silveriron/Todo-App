import { BadRequestException, Injectable } from '@nestjs/common';
import { Status, Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    const todos = await this.todosRepository.find({
      relations: { user: true },
    });
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.find({
      relations: { user: true },
      where: { id },
    });

    if (!todo) {
      throw new BadRequestException('todo를 찾을 수 없습니다.');
    }

    return todo[0];
  }

  async findByUserId(userId: number): Promise<Todo[]> {
    const todos = await this.todosRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
    });

    console.log(todos);

    return todos;
  }

  async create({
    title,
    content,
    isStatus,
    user,
  }: {
    title: string;
    content: string;
    isStatus: Status;
    user: User;
  }): Promise<Todo> {
    const newTodo = this.todosRepository.create({
      title,
      content,
      user,
      isStatus,
    });
    const todo = await this.todosRepository.save(newTodo);
    return todo;
  }

  async delete(id: number) {
    const todo = await this.todosRepository.findOne({
      relations: { user: true },
      where: { id },
    });

    console.log(todo);

    if (!todo) {
      throw new BadRequestException('todo를 찾을 수 없습니다.');
    }

    const result = await this.todosRepository.delete(todo.id);

    return todo;
  }

  update(todo: Todo) {
    return this.todosRepository.update(todo.id, todo);
  }
}
