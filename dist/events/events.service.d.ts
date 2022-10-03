/// <reference types="node" />
import { DatabaseFilesService } from 'src/database-files/database-files.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Events } from './events.entity';
export declare class EventsService {
    private eventsRepository;
    private readonly databaseFilesService;
    constructor(eventsRepository: Repository<Events>, databaseFilesService: DatabaseFilesService);
    findAll(): Promise<Events[]>;
    create(createEventDto: CreateEventDto): Promise<Events>;
    update(createUpdatedEventDto: UpdateEventDto): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
    find(filter: any): Promise<Events>;
    addEventImage(eventId: number, imageBuffer: Buffer, filename: string): Promise<import("../database-files/database-files.entity").default>;
}
