import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(createUserDto: CreateUserDto): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
    find(filter: any): Promise<User>;
    findByEmail(email: any): Promise<User>;
}
