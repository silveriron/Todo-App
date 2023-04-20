import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      sameSite: 'none',
      secure: true,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

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

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      sameSite: 'none',
      secure: true,
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 201, description: '로그아웃 되었습니다.' })
  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return '로그아웃 되었습니다.';
  }
}
