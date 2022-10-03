import { DeleteResult } from 'typeorm';
import { User } from '../users.entity';
export declare class ReturnDeletedUserDto {
    deleteResult: DeleteResult;
    deletedUser: User;
    message: string;
}
