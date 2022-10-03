import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseFilesService } from 'src/database-files/database-files.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Events)
        private eventsRepository: Repository<Events>,
        private readonly databaseFilesService: DatabaseFilesService
    ) { }

    async findAll(): Promise<Events[]> {
        return await this.eventsRepository.find();
    }

    async create(createEventDto: CreateEventDto): Promise<Events> {
        return this.eventsRepository.save(createEventDto);
    }

    async update(createUpdatedEventDto: UpdateEventDto): Promise<UpdateResult> {
        return this.eventsRepository.update(createUpdatedEventDto.id, createUpdatedEventDto);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.eventsRepository.delete(id);
    }

    async find(filter): Promise<Events> {

        return await this.eventsRepository.findOne(filter);

    }

    async addEventImage(eventId: number, imageBuffer: Buffer, filename: string) {
        const avatar = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
        await this.eventsRepository.update(eventId, {
            eventImageId: avatar.id
        });
        return avatar;
    }


}
