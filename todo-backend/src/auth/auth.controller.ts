import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user-dto';

@Controller('api/v1/auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signup(body);

    const { access_token, refresh_token } = await this.authService.createToken(
      user,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      sameSite: 'lax',
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return user;
  }

  @Post('signin')
  async signin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signin(body);

    const { access_token, refresh_token } = await this.authService.createToken(
      user,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      sameSite: 'lax',
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return user;
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', null, {
      maxAge: 0,
    });
    res.cookie('refresh_token', null, {
      maxAge: 0,
    });
    return '로그아웃 되었습니다.';
  }
}
