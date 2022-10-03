import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { ReturnUpdatedUserDto } from './dtos/return-updated-user.dto';
import { ReturnDeletedUserDto } from './dtos/return-deleted-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    index(): Promise<User[]>;
    findById(id: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<ReturnUserDto>;
    update(id: any, updateUserDto: UpdateUserDto): Promise<ReturnUpdatedUserDto>;
    delete(id: any): Promise<ReturnDeletedUserDto>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
