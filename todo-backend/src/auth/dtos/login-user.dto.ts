import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '사용자 이메일 주소',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '12345678',
    description: '사용자 비밀번호',
  })
  @IsString()
  password: string;
}
