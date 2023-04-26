import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { Status } from './todo.entity';

const mockTodosService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByUserId: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockTodo = {
  id: 1,
  title: 'test',
  content: 'test',
  isStatus: Status.TODO,
  userId: 1,
};

describe('TodosController', () => {
  let controller: TodosController;
  let todosService: TodosService;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('모든 Todo를 가져온다', async () => {
    todosService.findAll = jest.fn().mockResolvedValue([mockTodo]);
    const todos = await controller.findAll();
    expect(todos).toEqual([mockTodo]);
  });

  it('특정 Todo를 가져온다', async () => {
    todosService.findOne = jest.fn().mockResolvedValue(mockTodo);
    const todo = await controller.findOne('1');
    expect(todo.title).toEqual('test');
  });

  it('특정 User의 Todo를 가져온다', async () => {
    const req = {
      user: {
        id: 1,
      },
    };
    todosService.findByUserId = jest.fn().mockResolvedValue([mockTodo]);
    const todos = await controller.findByUserId(req as any);
    expect(todos).toEqual([mockTodo]);
  });

  it('Todo를 생성한다', async () => {
    todosService.create = jest.fn().mockResolvedValue(mockTodo);
    const req = {
      user: {
        id: 1,
      },
    };
    const todo = await controller.create(
      { title: 'test', content: 'test', isStatus: Status.TODO },
      req as any,
    );
    expect(todo.title).toEqual('test');
  });

  it('Todo를 삭제한다', async () => {
    todosService.delete = jest.fn().mockResolvedValue(mockTodo);
    const todo = await controller.delete('1');
    expect(todo).toBeDefined();
  });

  it('Todo를 수정한다', async () => {
    todosService.update = jest.fn().mockResolvedValue(mockTodo);
    const todo = await controller.update('1', {
      title: 'test',
      content: 'test',
      isStatus: Status.TODO,
    });
    expect(todo).toBeDefined();
  });
});
