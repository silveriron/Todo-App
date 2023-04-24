import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';

const mockAuthService = {
  signup: jest.fn(),
  signin: jest.fn(),
  createToken: jest.fn(),
};

const user = {
  email: 'test@test.com',
  userName: 'test',
  password: 'test1234',
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let response: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    response = {
      cookie: jest.fn(),
    } as unknown as Response;
  });

  it('SUCCESS: 회원가입', async () => {
    const mockAccessToken = 'access_token';
    const mockRefreshToken = 'refresh_token';

    authService.signup = jest.fn().mockResolvedValue(user);
    authService.createToken = jest.fn().mockResolvedValue({
      access_token: mockAccessToken,
      refresh_token: mockRefreshToken,
    });

    const register = await controller.signup(user, response);
    expect(register).toBeDefined();
    expect(register.email).toEqual(user.email);
    expect(response.cookie).toHaveBeenCalledWith(
      'access_token',
      mockAccessToken,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
        sameSite: 'lax',
      },
    );
    expect(response.cookie).toHaveBeenCalledWith(
      'refresh_token',
      mockRefreshToken,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'lax',
      },
    );
  });

  it('SUCCESS: 로그인', async () => {
    const mockAccessToken = 'access_token';
    const mockRefreshToken = 'refresh_token';

    authService.signin = jest.fn().mockResolvedValue(user);
    authService.createToken = jest.fn().mockResolvedValue({
      access_token: mockAccessToken,
      refresh_token: mockRefreshToken,
    });

    const register = await controller.signin(user, response);
    expect(register).toBeDefined();
    expect(register.email).toEqual(user.email);
    expect(response.cookie).toHaveBeenCalledWith(
      'access_token',
      mockAccessToken,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
        sameSite: 'lax',
      },
    );
    expect(response.cookie).toHaveBeenCalledWith(
      'refresh_token',
      mockRefreshToken,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'lax',
      },
    );
  });

  it('SUCCESS: 로그아웃', async () => {
    controller.signout(response);

    expect(response.cookie).toBeCalledTimes(2);
  });
});
