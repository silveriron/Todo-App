import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('TodosService', () => {
  let service: TodosService;
  let todosRepository: MockRepository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    todosRepository = module.get(getRepositoryToken(Todo));
  });

  it('SUCCESS: 모든 할 일을 반환한다.', async () => {
    todosRepository.find.mockResolvedValue([
      { id: 1, title: 'test', completed: false },
    ]);
    const todos = await service.findAll();
    expect(todos.length).not.toEqual(0);
  });

  it('SUCCESS: 할 일을 생성한다.', async () => {
    const title = 'test';
    const content = 'test';
    const userId = 1;
    todosRepository.create.mockReturnValue({
      id: 1,
      title,
      content,
      completed: false,
    });
  });
});
