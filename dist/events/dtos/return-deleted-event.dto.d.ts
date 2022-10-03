import { DeleteResult } from 'typeorm';
import { Events } from '../events.entity';
export declare class ReturnDeletedEventDto {
    deleteResult: DeleteResult;
    deletedEvent: Events;
    message: string;
}
