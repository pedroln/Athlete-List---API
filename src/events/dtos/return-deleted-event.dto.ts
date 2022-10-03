import { ApiProperty } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Events } from '../events.entity';


export class ReturnDeletedEventDto {
  @ApiProperty()
  deleteResult: DeleteResult;
  deletedEvent: Events;
  message: string;
}