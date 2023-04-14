import { Controller, Get, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/v1/todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }
}
