import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UnauthorizedException,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const access_token_options: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 30,
  sameSite: 'lax',
};

const refresh_token_options: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: 'lax',
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
    res.cookie('access_token', '', { maxAge: 0 });
    res.cookie('refresh_token', '', { maxAge: 0 });
    return '로그아웃 되었습니다.';
  }

  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({ status: 201, description: '토큰이 재발급 되었습니다.' })
  @ApiResponse({ status: 400, description: '토큰이 유효하지 않습니다.' })
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const refresh_token = req.cookies.refresh_token;

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

    return '토큰이 재발급 되었습니다.';
  }

  @Post('kakao')
  async kakaoLogin(@Body() body: { code: string }) {
    const { code } = body;
    const token = await this.authService.getKakaoToken(code);
    console.log(token);
  }
}
