import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUserDto);
    }

    async update(createUserDto: CreateUserDto): Promise<UpdateResult> {
        return this.userRepository.update(createUserDto.id, createUserDto);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async find(filter): Promise<User> {
        return await this.userRepository.findOne(filter);
    }

    async findByEmail(email): Promise<User> {
        return await this.userRepository.findOne({ where: { email: email } });
    }




}
