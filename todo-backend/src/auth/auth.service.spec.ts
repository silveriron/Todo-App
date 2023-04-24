import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

const bcrypt = require('bcrypt');

const mockUsersService = {
  findOne: jest.fn(),
  createUser: jest.fn(),
  updateRefreshToken: jest.fn(),
};

const user = {
  email: 'test@test.com',
  userName: 'test',
  password: 'test1234',
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    process.env.JWT_SECRET = 'test';

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('SUCCESS: 회원가입', async () => {
    usersService.findOne = jest.fn().mockResolvedValue(null);
    usersService.createUser = jest.fn().mockResolvedValue(user);
    const register = await service.signup(user);
    expect(register).toBeDefined();
    expect(register.email).toEqual(user.email);
  });

  it('FAIL: 이미 가입된 이메일', async () => {
    usersService.findOne = jest.fn().mockResolvedValue(user);
    try {
      await service.signup(user);
    } catch (e) {
      expect(e.message).toEqual('이미 가입된 이메일 입니다.');
    }
  });

  it('SUCCESS: 로그인', async () => {
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    usersService.findOne = jest
      .fn()
      .mockResolvedValue({ ...user, password: hashedPassword });

    const userData = await service.signin(user);

    expect(userData).toBeDefined();
  });

  it('FAIL: 가입되지 않은 이메일', async () => {
    usersService.findOne = jest.fn().mockResolvedValue(null);
    try {
      await service.signin(user);
    } catch (e) {
      expect(e.message).toEqual('가입되지 않은 이메일입니다.');
    }
  });

  it('FAIL: 로그인 시 패스워드 틀림', async () => {
    usersService.findOne = jest.fn().mockResolvedValue(user);
    try {
      await service.signin(user);
    } catch (e) {
      expect(e.message).toEqual('패스워드를 확인해주세요.');
    }
  });

  it('SUCCESS: access_token과 refresh_token을 생성', async () => {
    usersService.updateRefreshToken = jest.fn().mockResolvedValue(user);

    const token = await service.createToken({
      email: user.email,
      userName: user.userName,
      id: 1,
    } as User);

    expect(token.access_token).toBeDefined();
    expect(token.refresh_token).toBeDefined();
  });

  it('SUCCESS: refresh_token 검증', async () => {
    usersService.updateRefreshToken = jest.fn().mockResolvedValue(user);
    const { refresh_token } = await service.createToken({
      email: user.email,
      userName: user.userName,
      id: 1,
    } as User);
    usersService.findOne = jest
      .fn()
      .mockResolvedValue({ ...user, refresh_token: refresh_token });
    const vaildate = await service.validateRefreshToken(refresh_token);
    expect(vaildate).toBeTruthy();
  });

  it('FAIL: refresh_token 검증', async () => {
    usersService.updateRefreshToken = jest.fn().mockResolvedValue(user);
    const { refresh_token } = await service.createToken({
      email: user.email,
      userName: user.userName,
      id: 1,
    } as User);
    usersService.findOne = jest.fn().mockResolvedValue(user);
    try {
      await service.validateRefreshToken(refresh_token);
    } catch (e) {
      expect(e.message).toEqual('refresh_token이 유효하지 않습니다.');
    }
  });

  it('SUCCESS: access_token 재발급', async () => {
    const token = await service.getAccessToken({
      email: user.email,
      userName: user.userName,
      id: 1,
    } as User);

    expect(token.access_token).toBeDefined();
  });
});
