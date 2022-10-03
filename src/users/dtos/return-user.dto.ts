import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.entity';


export class ReturnUserDto {
  @ApiProperty()
  user: User;
  message: string;
}