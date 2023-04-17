import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('api/v1/todos')
// @UseGuards(AuthGuard)
export class TodosController {
  constructor(
    private todosService: TodosService,
    private usersService: UsersService,
  ) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    const email = 'test44@test.com';
    const { title, content } = body;
    const user = await this.usersService.findOne(email);

    return await this.todosService.create({
      title,
      content,
      user,
    });
  }
}
