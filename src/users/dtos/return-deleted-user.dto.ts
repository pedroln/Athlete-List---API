import { ApiProperty } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { User } from '../users.entity';

export class ReturnDeletedUserDto {
  @ApiProperty()
  deleteResult: DeleteResult;
  deletedUser: User;
  message: string;
}