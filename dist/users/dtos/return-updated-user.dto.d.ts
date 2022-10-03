import { UpdateResult } from 'typeorm';
import { User } from '../users.entity';
export declare class ReturnUpdatedUserDto {
    updateResult: UpdateResult;
    updatedUser: User;
    message: string;
}
