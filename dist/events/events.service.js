"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_files_service_1 = require("../database-files/database-files.service");
const typeorm_2 = require("typeorm");
const events_entity_1 = require("./events.entity");
let EventsService = class EventsService {
    constructor(eventsRepository, databaseFilesService) {
        this.eventsRepository = eventsRepository;
        this.databaseFilesService = databaseFilesService;
    }
    async findAll() {
        return await this.eventsRepository.find();
    }
    async create(createEventDto) {
        return this.eventsRepository.save(createEventDto);
    }
    async update(createUpdatedEventDto) {
        return this.eventsRepository.update(createUpdatedEventDto.id, createUpdatedEventDto);
    }
    async delete(id) {
        return await this.eventsRepository.delete(id);
    }
    async find(filter) {
        return await this.eventsRepository.findOne(filter);
    }
    async addEventImage(eventId, imageBuffer, filename) {
        const avatar = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
        await this.eventsRepository.update(eventId, {
            eventImageId: avatar.id
        });
        return avatar;
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(events_entity_1.Events)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        database_files_service_1.DatabaseFilesService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map