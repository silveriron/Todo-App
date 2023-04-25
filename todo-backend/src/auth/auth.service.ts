import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup({ email, userName, password }: CreateUserDto) {
    const duplicateUser = await this.usersService.findOne(email);

    if (duplicateUser) {
      throw new BadRequestException({ message: '이미 가입된 이메일 입니다.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = await this.usersService.createUser({
      email,
      userName,
      password: hashedPassword,
    });

    return user;
  }

  async signin({ email, password }: LoginUserDto) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new BadRequestException({ message: '가입되지 않은 이메일입니다.' });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      throw new BadRequestException({ message: '패스워드를 확인해주세요.' });
    }

    return user;
  }

  async createToken(user: User) {
    const payload = { userName: user.userName, email: user.email, id: user.id };

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7 days',
      secret: process.env.JWT_SECRET,
    });

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });

    await this.usersService.updateRefreshToken(user.email, refresh_token);

    return {
      access_token,
      refresh_token,
    };
  }

  async validateRefreshToken(refresh_token: string) {
    const { email } = await this.jwtService.verifyAsync(refresh_token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.usersService.findOne(email);

    if (!(refresh_token === user.refresh_token)) {
      throw new UnauthorizedException({
        message: 'refresh_token이 유효하지 않습니다.',
      });
    }

    return user;
  }

  async getAccessToken(user: User) {
    const payload = { userName: user.userName, email: user.email, id: user.id };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token,
    };
  }

  async getKakaoToken(code: string) {
    try {
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/auth/kakao/callback',
            code,
          },
        },
      );
      return res.data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException({
        message: '카카오 로그인에 실패했습니다.',
      });
    }
  }
}
