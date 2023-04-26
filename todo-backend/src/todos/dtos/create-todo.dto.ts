import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Status } from '../todo.entity';

export class CreateTodoDto {
  @ApiProperty({
    example: '프로젝트 서버 구축',
    description: '할 일 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'aws ec2 인스턴스 생성한 뒤 서버 구축하기',
    description: '할 일 내용',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'TODO',
    description: '할 일 상태',
  })
  @IsString()
  isStatus: Status;
}
