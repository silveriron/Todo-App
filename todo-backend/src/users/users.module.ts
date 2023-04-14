import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Todo } from 'src/todos/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
