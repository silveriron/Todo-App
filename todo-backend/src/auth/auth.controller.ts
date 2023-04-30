import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const access_token_options: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 30,
  sameSite: 'none',
  secure: true,
  domain: '.todo-app.shop',
};

const refresh_token_options: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: 'none',
  secure: true,
  domain: '.todo-app.shop',
};

@ApiTags('auth')
@Controller('api/v1/auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiResponse({ status: 400, description: '이미 존재하는 이메일입니다.' })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async signup(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signup(body);

    const { access_token, refresh_token } = await this.authService.createToken(
      user,
    );

    res.cookie('access_token', access_token, access_token_options);
    res.cookie('refresh_token', refresh_token, refresh_token_options);

    return user;
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiResponse({
    status: 400,
    description: '이메일 또는 비밀번호가 틀렸습니다.',
  })
  @ApiBody({ type: LoginUserDto })
  @Post('signin')
  async signin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signin(body);

    const { access_token, refresh_token } = await this.authService.createToken(
      user,
    );

    res.cookie('access_token', access_token, access_token_options);
    res.cookie('refresh_token', refresh_token, refresh_token_options);

    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 201, description: '로그아웃 되었습니다.' })
  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', { ...access_token_options, maxAge: 0 });
    res.cookie('refresh_token', '', { ...refresh_token_options, maxAge: 0 });
    return '로그아웃 되었습니다.';
  }

  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiResponse({ status: 400, description: '토큰이 유효하지 않습니다.' })
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { refresh_token: string },
  ) {
    const { refresh_token } = body;

    if (!refresh_token) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }

    const user = await this.authService.validateRefreshToken(refresh_token);

    if (!user) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }

    const access_token = await this.authService.getAccessToken(user);

    res.cookie('access_token', access_token, access_token_options);
    res.cookie('refresh_token', refresh_token, refresh_token_options);

    return user;
  }

  @ApiOperation({ summary: '카카오 로그인' })
  @ApiResponse({ status: 201, type: UserDto })
  @Post('kakao')
  async kakaoLogin(
    @Body() body: { code: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code } = body;
    const { access_token, refresh_token } =
      await this.authService.getKakaoToken(code);

    const userInfo = await this.authService.getKakaoUserInfo(access_token);

    const user = await this.authService.findUserByKakaoId(
      userInfo.kakao_account.email,
    );

    if (user) {
      const { access_token, refresh_token } =
        await this.authService.createToken(user);

      res.cookie('access_token', access_token, access_token_options);
      res.cookie('refresh_token', refresh_token, refresh_token_options);

      return user;
    }

    if (!user) {
      const newUser = await this.authService.signup({
        email: userInfo.kakao_account.email,
        userName: userInfo.kakao_account.profile.nickname,
        password: userInfo.id.toString(),
      });

      const { access_token, refresh_token } =
        await this.authService.createToken(newUser);

      res.cookie('access_token', access_token, access_token_options);
      res.cookie('refresh_token', refresh_token, refresh_token_options);

      return newUser;
    }
  }
}
