import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DatabaseFilesService } from 'src/database-files/database-files.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import { CreateEventDto } from './dtos/create-event.dto';
import { ReturnDeletedEventDto } from './dtos/return-deleted-event.dto';
import { ReturnEventDto } from './dtos/return-event.dto';
import { ReturnUpdatedEventDto } from './dtos/return-updated-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Events } from './events.entity';
import { EventsService } from './events.service';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';



@Controller('events')
@ApiTags('Events')
export class EventsController {
    constructor(private eventsService: EventsService,
        private readonly databaseFilesService: DatabaseFilesService) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({ 
        summary: 'Lista todos os eventos registrados no banco de dados' 
    })
    @ApiOkResponse({
        description: 'Retorna com sucesso todos os eventos registrados',
        type: Events,
        isArray: true
    })
    index(): Promise<Events[]> {
        return this.eventsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ 
        summary: 'Procura um evento a partir do ID inserido como parâmetro' 
    })
    @ApiParam({
         name: 'id', 
         required: true, 
         description: 'O ID do evento que deseja buscar no banco de dados', 
         type: 'integer' 
        })
    @ApiOkResponse({
        description: 'Usuário encontrado com sucesso a partir do ID inserido',
        type: Events
    })
    @ApiNotFoundResponse({
        description: 'ID inserido não possui um evento atrelado a ele'
    })
    async findById(@Param('id') id): Promise<Events> {
        const event = await this.eventsService.find(id)

        if (event === undefined) {
            throw new HttpException('Evento com o ID inserido não encontrado', HttpStatus.NOT_FOUND);
        }

        return event;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('createEvent')
    @ApiOperation({ 
        summary: 'Cria um evento novo e insere no banco de dados' 
    })
    @ApiCreatedResponse({
        description: 'Evento cadastrado com sucesso',
        type: ReturnEventDto,
    })
    @ApiBadRequestResponse({
        description: 'Nome do evento já existente no banco de dados, email fora do modelo válido (exemplo@email.com), data fora do modelo válido (YYYY-MM-DD),telefone com menos de 8 caracteres ou mais que 9 caracteres, campos inexistente ou com mais de 200 caracteres',
    })
    @ApiBody({
        description: "Corpo da requisição para criação de um evento",
        type: CreateEventDto
    })
    async create(@Body(ValidationPipe) createEventDto: CreateEventDto): Promise<ReturnEventDto> {
        var repeatedName = false;
        var events = await this.eventsService.findAll()

        for (let index in events) {
            if (events[index].eventName == createEventDto.eventName) {
                repeatedName = true;
            }
        }

        if (repeatedName == true) {
            throw new HttpException('Evento já existente no banco de dados', HttpStatus.BAD_REQUEST);
        }


        const event = await this.eventsService.create(createEventDto);
        return {
            event,
            message: 'Evento cadastrado com sucesso',
        };
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('updateEvent/:id')
    @ApiOperation({ 
        summary: 'Atualiza um evento a partir do ID dele' 
    })
    @ApiParam({ name: 'id', 
    required: true, 
    description: 'O ID do evento que deseja atualizar no banco de dados', 
    type: 'integer' })
    @ApiOkResponse({
        description: 'Usuário atualizado com sucesso a partir do ID inserido',
        type: ReturnUpdatedEventDto
    })
    @ApiBadRequestResponse({
        description: 'Nome do evento já existente no banco de dados, email fora do modelo válido (exemplo@email.com), data fora do modelo válido (YYYY-MM-DD),telefone com menos de 8 caracteres ou mais que 9 caracteres, campos inexistente ou com mais de 200 caracteres',
    })
    @ApiNotFoundResponse({
        description: 'Evento com o ID para atualizar não encontrado'
    })
    async update(@Param('id') id, @Body(ValidationPipe) updateEventDto: UpdateEventDto): Promise<ReturnUpdatedEventDto> {
        updateEventDto.id = Number(id);
        var foundEvent = false;
        var repeatedName = false;
        var events = await this.eventsService.findAll()


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
            throw new HttpException('Evento com o ID para atualizar inexistente', HttpStatus.NOT_FOUND);
        }

        if (repeatedName == true) {
            throw new HttpException('Evento já existente no banco de dados', HttpStatus.BAD_REQUEST);
        }


        const updateResult = await this.eventsService.update(updateEventDto);
        const updatedEvent = await this.eventsService.find(updateEventDto.id);
        return {
            updateResult,
            updatedEvent,
            message: 'Evento atualizado com sucesso',
        };

    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('deleteEvent/:id')
    @ApiOperation({
        summary: 'Deleta um evento a partir do ID dele'
    })
    @ApiParam({
         name: 'id', 
         required: true, 
         description: 'O ID do evento que deseja deletar no banco de dados', 
         type: 'integer' 
        })
    @ApiOkResponse({
        description: 'Evento deletado com sucesso a partir do ID inserido',
        type: ReturnDeletedEventDto
    })
    @ApiNotFoundResponse({
        description: 'Evento com o ID para deletar não encontrado'
    })
    async delete(@Param('id') id): Promise<ReturnDeletedEventDto> {
        var foundEvent = false;
        var events = await this.eventsService.findAll()

        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }

        if (foundEvent == false) {
            throw new HttpException('Evento com o ID para deletar inexistente', HttpStatus.NOT_FOUND);
        }

        const deletedEvent = await this.eventsService.find(id);
        const deleteResult = await this.eventsService.delete(id);
        return {
            deleteResult,
            deletedEvent,
            message: 'Evento deletado com sucesso',
        };

    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('uploadEventImage/:id')
    @ApiOperation({
        summary: 'Adiciona uma imagem a um evento a partir do ID dele'
    })
    @ApiConsumes('multipart/form-data')
    @ApiParam({
         name: 'id', 
         required: true, 
         description: 'O ID do evento que deseja adicionar a imagem', 
         type: 'integer' 
        })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiCreatedResponse({
        description: 'Evento deletado com sucesso a partir do ID inserido',
        type: ReturnUpdatedEventDto
    })
    @ApiNotFoundResponse({
        description: 'Evento com o ID para adicionar a imagem não encontrado'
    })
    @UseInterceptors(FileInterceptor('file'))
    async addEventImage(@Param('id') id, @UploadedFile() file: Express.Multer.File) {
        var foundEvent = false;
        var events = await this.eventsService.findAll()

        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }

        if (foundEvent == false) {
            throw new HttpException('Evento com o ID para adicionar a imagem inexistente', HttpStatus.NOT_FOUND);
        }

        await this.eventsService.addEventImage(id, file.buffer, file.originalname);
        var event = await this.eventsService.find(id);
        
        return {
            event,
            message: "Imagem do evento carregada com sucesso"
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('eventImage/:id')
    @ApiOperation({
        summary: 'Retorna a imagem do evento pelo seu ID (Como um link disponível para download)'
    })
    @ApiParam({ 
        name: 'id', 
        required: true, 
        description: 'O ID do evento que deseja retornar a imagem', 
        type: 'integer' 
    })
    @ApiOkResponse({
        description: 'Imagem retornada com sucesso a partir do ID inserido',
        type: StreamableFile
    })
    async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response) {
        var foundEvent = false;
        var events = await this.eventsService.findAll()

        for (let index in events) {
            if (events[index].id == id) {
                foundEvent = true;
            }
        }

        if (foundEvent == false) {
            throw new HttpException('Evento com o ID enviado inexistente', HttpStatus.NOT_FOUND);
        }

        var event = await this.eventsService.find(id);
        var eventImageId = event.eventImageId;

        if (eventImageId == null) {
            throw new HttpException('Não há imagem atrelada ao evento em questão', HttpStatus.NOT_FOUND);
        }

        var file = await this.databaseFilesService.getFileById((await event).eventImageId);

        const stream = Readable.from(file.data);

        response.set({
            'Content-Disposition': `attachment; filename="${file.filename}"`,
            'Content-Type': 'image'
        })

        return new StreamableFile(stream);
    }

}
