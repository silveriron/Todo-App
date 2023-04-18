import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '사용자 이메일 주소',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'tester',
    description: '사용자 이름',
  })
  @IsString()
  userName: string;
  @ApiProperty({
    example: '12345678',
    description: '사용자 비밀번호',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
