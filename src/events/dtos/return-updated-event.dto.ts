import { ApiProperty } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { Events } from '../events.entity';

export class ReturnUpdatedEventDto {
  @ApiProperty()
  updateResult: UpdateResult;
  updatedEvent: Events;
  message: string;
}