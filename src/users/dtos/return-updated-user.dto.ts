import { ApiProperty } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { User } from '../users.entity';

export class ReturnUpdatedUserDto {
  @ApiProperty()
  updateResult: UpdateResult;
  updatedUser: User;
  message: string;
}