import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

const mockRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('SUCCESS: 모든 유저를 반환한다.', async () => {
    userRepository.find.mockResolvedValue([{ id: 1, email: 'test' }]);
    const users = await service.findAll();
    expect(users.length).not.toEqual(0);
  });

  it('SUCCESS: 이메일로 유저를 찾는다.', async () => {
    userRepository.findOneBy.mockResolvedValue({ id: 1, email: 'test' });
    const user = await service.findOne('test');
    expect(user).toBeDefined();
    expect(user.email).toEqual('test');
  });

  it('SUCCESS: 유저를 생성한다.', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      userName: 'test',
      password: 'test',
    };
    userRepository.create.mockResolvedValue(user);
    userRepository.save.mockResolvedValue(user);
    const createdUser = await service.createUser(user);
    expect(createdUser).toBeDefined();
    expect(createdUser.email).toEqual(user.email);
    expect(createdUser.userName).toEqual(user.userName);
  });

  it('SUCCESS: 유저의 refresh_token을 업데이트한다.', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      userName: 'test',
      refresh_token: '',
    };
    userRepository.findOneBy.mockResolvedValue(user);
    userRepository.save.mockResolvedValue({ ...user, refresh_token: 'test' });
    const newUser = await service.updateRefreshToken(user.email, 'test');

    expect(newUser).toBeDefined();
    expect(newUser.refresh_token).toEqual('test');
  });

  it('FAIL: 유저의 refresh_token을 업데이트한다.', async () => {
    const user = {
      id: 1,
      email: 'test@test.com',
      userName: 'test',
      refresh_token: '',
    };
    userRepository.findOneBy.mockResolvedValue(null);
    try {
      await service.updateRefreshToken(user.email, 'test');
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
