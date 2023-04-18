import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
@Serialize(UserDto)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersSevice: UsersService) {}

  @Get('findAll')
  findAll() {
    return this.usersSevice.findAll();
  }
}
