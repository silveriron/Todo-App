import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
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

  async create({
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
      user,
      isStatus: 'todo',
    });
    const todo = await this.todosRepository.save(newTodo);
    console.log(todo);
    return todo;
  }

  delete(id: number) {
    return this.todosRepository.delete(id);
  }

  update(todo: Todo) {
    return this.todosRepository.update(todo.id, todo);
  }
}
