import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    example: 1,
    description: '사용자 고유 ID',
  })
  @Expose()
  id: number;
  @ApiProperty({
    example: 'tester',
    description: '사용자 이름',
  })
  @Expose()
  userName: string;
  @ApiProperty({
    example: 'test@test.com',
    description: '사용자 이메일 주소',
  })
  @Expose()
  email: string;
}
