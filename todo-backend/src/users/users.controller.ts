import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/users')
@Serialize(UserDto)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersSevice: UsersService) {}

  @ApiOperation({ summary: '모든 User 조회' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다.' })
  @Get('findAll')
  findAll() {
    return this.usersSevice.findAll();
  }
}
