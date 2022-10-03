import { Controller, Request, Get, HttpException, HttpStatus, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { ReturnUpdatedUserDto } from './dtos/return-updated-user.dto';
import { ReturnDeletedUserDto } from './dtos/return-deleted-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private usersService: UsersService,
        private authService: AuthService) { }

    @Get()
    @ApiOperation({
        summary: 'Lista todos os usuários registrados no banco de dados'
    })
    @ApiOkResponse({
        description: 'Retorna com sucesso todos os usuários registrados',
        type: User,
        isArray: true
    })
    index(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Procura um usuário a partir do ID inserido como parâmetro'
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'O ID do usuário que deseja buscar no banco de dados',
        type: 'integer'
    })
    @ApiOkResponse({
        description: 'Usuário encontrado com sucesso a partir do ID inserido',
        type: User
    })
    @ApiNotFoundResponse({
        description: 'ID inserido não possui um usuário atrelado a ele'
    })
    async findById(@Param('id') id): Promise<User> {
        const user = await this.usersService.find(id);

        if (user === undefined)
            throw new HttpException('Usuário com o ID inserido não encontrado', HttpStatus.NOT_FOUND);

        return user;
    }

    @Post('createUser')
    @ApiOperation({
        summary: 'Cria um usuário novo e insere no banco de dados'
    })
    @ApiCreatedResponse({
        description: 'Usuário cadastrado com sucesso',
        type: ReturnUserDto,
    })
    @ApiBadRequestResponse({
        description: 'Email já existente no banco de dados, email fora do modelo válido de email, email com mais de 200 caracteres, senha com menos de 6 caracteres',
    })
    @ApiBody({
        description: "Corpo da requisição para criação de um usuário",
        type: CreateUserDto
    })
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        var repeatedEmail = false;
        const users = await this.usersService.findAll();

        for (let index in users) {
            if (users[index].email == createUserDto.email) {
                repeatedEmail = true;
            }
        }

        if (repeatedEmail == true) {
            throw new HttpException('Email já existente no banco de dados', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersService.create(createUserDto);
        return {
            user,
            message: 'Usuário cadastrado com sucesso',
        };
    }


    @Put('updateUser/:id')
    @ApiBody({
        description: "Corpo da requisição para atualização de um usuário",
        type: UpdateUserDto
    })
    @ApiOperation({
        summary: 'Atualiza um usuário a partir do ID dele'
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'O ID do usuário que deseja atualizar no banco de dados',
        type: 'integer'
    })
    @ApiOkResponse({
        description: 'Usuário atualizado com sucesso a partir do ID inserido',
        type: ReturnUpdatedUserDto
    })
    @ApiBadRequestResponse({
        description: 'Email já existente no banco de dados, email fora do modelo válido de email, email com mais de 200 caracteres, senha com menos de 6 caracteres',
    })
    @ApiNotFoundResponse({
        description: 'Usuário com o ID para atualizar não encontrado'
    })
    async update(@Param('id') id, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<ReturnUpdatedUserDto> {
        updateUserDto.id = Number(id);
        var foundUser = false;
        var repeatedEmail = false;
        const users = await this.usersService.findAll();

        for (let index in users) {
            if (users[index].id == id) {
                foundUser = true;
            }
        }

        if (foundUser == true) {
            for (let index in users) {
                if (users[index].email == updateUserDto.email) {
                    repeatedEmail = true;
                }
            }
        }

        else {
            throw new HttpException('Usuário com o ID para atualizar inexistente', HttpStatus.NOT_FOUND);
        }

        if (repeatedEmail == true) {
            throw new HttpException('Email já existente no banco de dados', HttpStatus.BAD_REQUEST);
        }


        const updateResult = await this.usersService.update(updateUserDto);
        const updatedUser = await this.usersService.find(updateUserDto.id);
        return {
            updateResult,
            updatedUser,
            message: 'Usuário atualizado com sucesso',
        };

    }

    @Delete('deleteUser/:id')
    @ApiOperation({
        summary: 'Deleta um usuário a partir do ID dele'
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'O ID do usuário que deseja deletar no banco de dados',
        type: 'integer'
    })
    @ApiOkResponse({
        description: 'Usuário deletado com sucesso a partir do ID inserido',
        type: ReturnDeletedUserDto
    })
    @ApiNotFoundResponse({
        description: 'Usuário com o ID para deletar não encontrado'
    })
    async delete(@Param('id') id): Promise<ReturnDeletedUserDto> {
        var foundUser = false;
        const users = await this.usersService.findAll()

        for (let index in users) {
            if (users[index].id == id) {
                foundUser = true;
            }
        }

        if (foundUser == false) {
            throw new HttpException('Usuário com o ID para deletar inexistente', HttpStatus.NOT_FOUND);
        }

        const deletedUser = await this.usersService.find(id);
        const deleteResult = await this.usersService.delete(id);
        return {
            deleteResult,
            deletedUser,
            message: 'Usuário deletado com sucesso',
        };

    }

    @UseGuards(LocalAuthGuard)
    @ApiBody({
        description: "Corpo da requisição para login de um usuário",
        type: CreateUserDto
    })
    @ApiOperation({
        summary: 'Se loga com um usuário e retorna o token de acesso JWT'
    })
    @ApiCreatedResponse({
        description: 'Usuário logado com sucesso a partir do ID inserido',
        type: String
    })
    @ApiUnauthorizedResponse({
        description: 'Usuário e senha não correspondem no banco de dados'
    })
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
