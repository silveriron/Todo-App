import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Repository } from 'typeorm';
import { Status, Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
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

  it('SUCCESS: 모든 todo을 반환한다.', async () => {
    todosRepository.find.mockResolvedValue([
      { id: 1, title: 'test', isStatus: Status.TODO },
    ]);
    const todos = await service.findAll();
    expect(todos.length).not.toEqual(0);
  });

  it('SUCCESS: id에 해당하는 todo를 반환한다.', async () => {
    const id = 1;
    const todo = { id, title: 'test', isStatus: Status.TODO };
    todosRepository.find.mockResolvedValue([todo]);
    const result = await service.findOne(id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
  });

  it('SUCCESS: userId에 해당하는 todo를 반환한다.', async () => {
    const userId = 1;
    const todo = { id: 1, title: 'test', isStatus: 'todo' };
    todosRepository.find.mockResolvedValue([todo]);
    const result = await service.findByUserId(userId);

    expect(result).toBeDefined();
    expect(result.length).toEqual(1);
  });

  it('FAIL: id에 해당하는 todo가 없으면 에러를 반환한다.', async () => {
    const id = 1;
    todosRepository.findOneBy.mockResolvedValue(undefined);
    try {
      await service.findOne(id);
    } catch (e) {
      expect(e.message).toBe('todo를 찾을 수 없습니다.');
    }
  });

  it('SUCCESS: todo를 만든다.', async () => {
    const title = 'test';
    const content = 'test';
    const user = {
      id: 1,
      email: 'test@test.com',
      userName: 'test',
    } as User;

    const newTodo = {
      id: 1,
      title,
      content,
      completed: false,
      user,
    };
    todosRepository.create.mockReturnValue(newTodo);

    todosRepository.save.mockResolvedValue(newTodo);

    const todo = await service.create({
      title,
      content,
      user,
      isStatus: Status.TODO,
    });

    expect(todo).toBeDefined();
    expect(todo.id).toEqual(1);
    expect(todo.title).toEqual(title);
    expect(todo.content).toEqual(content);
  });

  it('SUCCESS: todo를 수정한다.', async () => {
    const id = 1;
    const title = 'test';
    const content = 'test';
    const todo = { id, title, content, isStatus: Status.TODO };
    todosRepository.update.mockResolvedValue(todo);
    const result = await service.update(todo as Todo);
    expect(result).toBeDefined();
  });

  it('SUCCESS: todo를 삭제한다.', async () => {
    const id = 1;
    const todo = { id, title: 'test', completed: false };
    todosRepository.findOne.mockResolvedValue(todo);

    todosRepository.delete.mockResolvedValue(todo);
    const result = await service.delete(id);
    expect(result).toBeDefined();
  });
});
