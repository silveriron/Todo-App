import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { access_token_options } from 'src/constants/cookies';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token.access_token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
    } catch {
      try {
        const payload = await this.jwtService.verifyAsync(token.refresh_token, {
          secret: process.env.JWT_SECRET,
        });

        await this.authService.validateRefreshToken(token.refresh_token);

        const { access_token } = await this.authService.getAccessToken(payload);
        response.cookie('access_token', access_token, access_token_options);
      } catch {
        throw new UnauthorizedException();
      }
    }
    return true;
  }
  private extractTokenFromHeader(request: Request) {
    const access_token = request.cookies.access_token as string | undefined;
    const refresh_token = request.cookies.refresh_token as string | undefined;
    return { access_token, refresh_token };
  }
}
