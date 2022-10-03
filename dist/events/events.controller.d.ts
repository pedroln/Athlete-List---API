/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { DatabaseFilesService } from 'src/database-files/database-files.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { ReturnDeletedEventDto } from './dtos/return-deleted-event.dto';
import { ReturnEventDto } from './dtos/return-event.dto';
import { ReturnUpdatedEventDto } from './dtos/return-updated-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Events } from './events.entity';
import { EventsService } from './events.service';
import { Response } from 'express';
export declare class EventsController {
    private eventsService;
    private readonly databaseFilesService;
    constructor(eventsService: EventsService, databaseFilesService: DatabaseFilesService);
    index(): Promise<Events[]>;
    findById(id: any): Promise<Events>;
    create(createEventDto: CreateEventDto): Promise<ReturnEventDto>;
    update(id: any, updateEventDto: UpdateEventDto): Promise<ReturnUpdatedEventDto>;
    delete(id: any): Promise<ReturnDeletedEventDto>;
    addEventImage(id: any, file: Express.Multer.File): Promise<{
        event: Events;
        message: string;
    }>;
    getDatabaseFileById(id: number, response: Response): Promise<StreamableFile>;
}
