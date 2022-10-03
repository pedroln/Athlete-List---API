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
exports.EventsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const database_files_service_1 = require("../database-files/database-files.service");
const PlatformTools_1 = require("typeorm/platform/PlatformTools");
const create_event_dto_1 = require("./dtos/create-event.dto");
const return_deleted_event_dto_1 = require("./dtos/return-deleted-event.dto");
const return_event_dto_1 = require("./dtos/return-event.dto");
const return_updated_event_dto_1 = require("./dtos/return-updated-event.dto");
const update_event_dto_1 = require("./dtos/update-event.dto");
const events_entity_1 = require("./events.entity");
const events_service_1 = require("./events.service");
const swagger_1 = require("@nestjs/swagger");
let EventsController = class EventsController {
    constructor(eventsService, databaseFilesService) {
        this.eventsService = eventsService;
        this.databaseFilesService = databaseFilesService;
    }
    index() {
        return this.eventsService.findAll();
    }
    async findById(id) {
        const event = await this.eventsService.find(id);
        if (event === undefined) {
            throw new common_1.HttpException('Evento com o ID inserido não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return event;
    }
    async create(createEventDto) {
        var repeatedName = false;
        var events = await this.eventsService.findAll();
        for (let index in events) {
            if (events[index].eventName == createEventDto.eventName) {
                repeatedName = true;
            }
        }
        if (repeatedName == true) {
            throw new common_1.HttpException('Evento já existente no banco de dados', common_1.HttpStatus.BAD_REQUEST);
        }
        const event = await this.eventsService.create(createEventDto);
        return {
            event,
            message: 'Evento cadastrado com sucesso',
        };
    }
    async update(id, updateEventDto) {
        updateEventDto.id = Number(id);
        var foundEvent = false;
        var repeatedName = false;
        var events = await this.eventsService.findAll();
        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }
        if (foundEvent == true) {
            for (let index in events) {
                if (events[index].eventName == updateEventDto.eventName) {
                    repeatedName = true;
                }
            }
        }
        else {
            throw new common_1.HttpException('Evento com o ID para atualizar inexistente', common_1.HttpStatus.NOT_FOUND);
        }
        if (repeatedName == true) {
            throw new common_1.HttpException('Evento já existente no banco de dados', common_1.HttpStatus.BAD_REQUEST);
        }
        const updateResult = await this.eventsService.update(updateEventDto);
        const updatedEvent = await this.eventsService.find(updateEventDto.id);
        return {
            updateResult,
            updatedEvent,
            message: 'Evento atualizado com sucesso',
        };
    }
    async delete(id) {
        var foundEvent = false;
        var events = await this.eventsService.findAll();
        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }
        if (foundEvent == false) {
            throw new common_1.HttpException('Evento com o ID para deletar inexistente', common_1.HttpStatus.NOT_FOUND);
        }
        const deletedEvent = await this.eventsService.find(id);
        const deleteResult = await this.eventsService.delete(id);
        return {
            deleteResult,
            deletedEvent,
            message: 'Evento deletado com sucesso',
        };
    }
    async addEventImage(id, file) {
        var foundEvent = false;
        var events = await this.eventsService.findAll();
        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }
        if (foundEvent == false) {
            throw new common_1.HttpException('Evento com o ID para adicionar a imagem inexistente', common_1.HttpStatus.NOT_FOUND);
        }
        await this.eventsService.addEventImage(id, file.buffer, file.originalname);
        var event = await this.eventsService.find(id);
        return {
            event,
            message: "Imagem do evento carregada com sucesso"
        };
    }
    async getDatabaseFileById(id, response) {
        var foundEvent = false;
        var events = await this.eventsService.findAll();
        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }
        if (foundEvent == false) {
            throw new common_1.HttpException('Evento com o ID enviado inexistente', common_1.HttpStatus.NOT_FOUND);
        }
        var event = await this.eventsService.find(id);
        var eventImageId = event.eventImageId;
        if (eventImageId == null) {
            throw new common_1.HttpException('Não há imagem atrelada ao evento em questão', common_1.HttpStatus.NOT_FOUND);
        }
        var file = await this.databaseFilesService.getFileById((await event).eventImageId);
        const stream = PlatformTools_1.Readable.from(file.data);
        response.set({
            'Content-Disposition': `attachment; filename="${file.filename}"`,
            'Content-Type': 'image'
        });
        return new common_1.StreamableFile(stream);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lista todos os eventos registrados no banco de dados'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Retorna com sucesso todos os eventos registrados',
        type: events_entity_1.Events,
        isArray: true
    }),
    openapi.ApiResponse({ status: 200, type: [require("./events.entity").Events] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "index", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Procura um evento a partir do ID inserido como parâmetro'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do evento que deseja buscar no banco de dados',
        type: 'integer'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Usuário encontrado com sucesso a partir do ID inserido',
        type: events_entity_1.Events
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'ID inserido não possui um evento atrelado a ele'
    }),
    openapi.ApiResponse({ status: 200, type: require("./events.entity").Events }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('createEvent'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria um evento novo e insere no banco de dados'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Evento cadastrado com sucesso',
        type: return_event_dto_1.ReturnEventDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Nome do evento já existente no banco de dados, email fora do modelo válido (exemplo@email.com), data fora do modelo válido (YYYY-MM-DD),telefone com menos de 8 caracteres ou mais que 9 caracteres, campos inexistente ou com mais de 200 caracteres',
    }),
    (0, swagger_1.ApiBody)({
        description: "Corpo da requisição para criação de um evento",
        type: create_event_dto_1.CreateEventDto
    }),
    openapi.ApiResponse({ status: 201, type: require("./dtos/return-event.dto").ReturnEventDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('updateEvent/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualiza um evento a partir do ID dele'
    }),
    (0, swagger_1.ApiParam)({ name: 'id',
        required: true,
        description: 'O ID do evento que deseja atualizar no banco de dados',
        type: 'integer' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Usuário atualizado com sucesso a partir do ID inserido',
        type: return_updated_event_dto_1.ReturnUpdatedEventDto
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Nome do evento já existente no banco de dados, email fora do modelo válido (exemplo@email.com), data fora do modelo válido (YYYY-MM-DD),telefone com menos de 8 caracteres ou mais que 9 caracteres, campos inexistente ou com mais de 200 caracteres',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Evento com o ID para atualizar não encontrado'
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/return-updated-event.dto").ReturnUpdatedEventDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('deleteEvent/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Deleta um evento a partir do ID dele'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do evento que deseja deletar no banco de dados',
        type: 'integer'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Evento deletado com sucesso a partir do ID inserido',
        type: return_deleted_event_dto_1.ReturnDeletedEventDto
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Evento com o ID para deletar não encontrado'
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/return-deleted-event.dto").ReturnDeletedEventDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('uploadEventImage/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Adiciona uma imagem a um evento a partir do ID dele'
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do evento que deseja adicionar a imagem',
        type: 'integer'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Evento deletado com sucesso a partir do ID inserido',
        type: return_updated_event_dto_1.ReturnUpdatedEventDto
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Evento com o ID para adicionar a imagem não encontrado'
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "addEventImage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('eventImage/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna a imagem do evento pelo seu ID (Como um link disponível para download)'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do evento que deseja retornar a imagem',
        type: 'integer'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Imagem retornada com sucesso a partir do ID inserido',
        type: common_1.StreamableFile
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getDatabaseFileById", null);
EventsController = __decorate([
    (0, common_1.Controller)('events'),
    (0, swagger_1.ApiTags)('Events'),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        database_files_service_1.DatabaseFilesService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map