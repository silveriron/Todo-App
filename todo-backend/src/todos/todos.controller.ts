import {
  BadRequestException,
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
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

@ApiTags('todos')
@Controller('api/v1/todos')
@UseGuards(AuthGuard)
@Serialize(TodoDto)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @ApiOperation({ summary: '모든 Todo 조회' })
  @ApiResponse({ status: 200, type: [TodoDto] })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @ApiOperation({ summary: '특정 User의 Todo 조회' })
  @ApiResponse({ status: 200, type: [TodoDto] })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @ApiResponse({ status: 404, description: 'User가 존재하지 않습니다.' })
  @Get('/user')
  async findByUserId(@Req() req: Request) {
    const userId = req.user.id;

    return await this.todosService.findByUserId(userId);
  }

  @ApiOperation({ summary: '특정 Todo 조회' })
  @ApiResponse({ status: 200, type: TodoDto })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @ApiResponse({ status: 404, description: 'Todo가 존재하지 않습니다.' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(parseInt(id, 10));
  }

  @ApiOperation({ summary: 'Todo 생성' })
  @ApiResponse({ status: 201, type: TodoDto })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @ApiResponse({ status: 404, description: 'User가 존재하지 않습니다.' })
  @ApiBody({ type: CreateTodoDto })
  @Post()
  async create(@Body() body: CreateTodoDto, @Req() req: Request) {
    const { title, content, isStatus } = body;
    const user = req.user;

    return await this.todosService.create({ title, content, isStatus, user });
  }

  @ApiOperation({ summary: 'Todo 삭제' })
  @ApiResponse({ status: 200, type: TodoDto })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @ApiResponse({ status: 404, description: 'Todo가 존재하지 않습니다.' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const todo = await this.todosService.findOne(parseInt(id, 10));

    if (!todo) {
      throw new BadRequestException('Todo를 찾을 수 없습니다.');
    }

    await this.todosService.delete(parseInt(id, 10));

    return todo;
  }

  @ApiOperation({ summary: 'Todo 수정' })
  @ApiResponse({ status: 200, type: TodoDto })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @ApiResponse({ status: 404, description: 'Todo가 존재하지 않습니다.' })
  @ApiQuery({ name: 'id', type: Number, required: true })
  @ApiBody({ type: CreateTodoDto })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: CreateTodoDto) {
    const todo = await this.todosService.findOne(parseInt(id, 10));

    if (!todo) {
      throw new BadRequestException('Todo를 찾을 수 없습니다.');
    }

    const newTodo = { ...todo, ...body };

    await this.todosService.update(newTodo);

    return todo;
  }
}
