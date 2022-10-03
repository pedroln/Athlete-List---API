import { UpdateResult } from 'typeorm';
import { Events } from '../events.entity';
export declare class ReturnUpdatedEventDto {
    updateResult: UpdateResult;
    updatedEvent: Events;
    message: string;
}
