import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Request } from 'express';
import { TodoDto } from './dtos/todo-dto';
import { Serialize } from '../interceptors/serialize.interceptor';

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

@Controller('api/v1/todos')
@UseGuards(AuthGuard)
@Serialize(TodoDto)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(parseInt(id, 10));
  }

  @Get('/user')
  async findByUserId(@Req() req: Request) {
    const userId = req.user.id;
    return await this.todosService.findByUserId(userId);
  }

  @Post()
  async create(@Body() body: CreateTodoDto, @Req() req: Request) {
    const { title, content } = body;
    const userId = req.user.id;
    return await this.todosService.create({ title, content, userId });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.todosService.delete(parseInt(id, 10));
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: Partial<CreateTodoDto>) {
    const todo = await this.todosService.findOne(parseInt(id, 10));

    const newTodo = { ...todo, ...body };

    return await this.todosService.update(newTodo);
  }
}
