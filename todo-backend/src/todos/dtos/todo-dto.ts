import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Status } from '../todo.entity';

export class TodoDto {
  @ApiProperty({
    example: 1,
    description: '할 일 고유 ID',
  })
  @Expose()
  id: number;
  @ApiProperty({
    example: '프로젝트 서버 구축',
    description: '할 일 제목',
  })
  @Expose()
  title: string;
  @ApiProperty({
    example: 'aws ec2 인스턴스 생성한 뒤 서버 구축하기',
    description: '할 일 내용',
  })
  @Expose()
  content: string;
  @ApiProperty({
    example: 'todo',
    description: '할 일 상태',
  })
  @Expose()
  isStatus: Status.TODO;
  @ApiProperty({
    example: 1,
    description: '할 일을 생성한 사용자 고유 ID',
  })
  @Transform(({ obj }) => {
    return obj.user.id;
  })
  @Expose()
  userId: number;
}
