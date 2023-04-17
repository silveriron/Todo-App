import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

@Controller('api/v1/todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDto, @Req() req: Request) {
    const { title, content } = body;
    const userId = req.user.id;
    return await this.todosService.create({ title, content, userId });
  }
}
