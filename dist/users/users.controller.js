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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const users_service_1 = require("./users.service");
const common_2 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user.dto");
const return_user_dto_1 = require("./dtos/return-user.dto");
const return_updated_user_dto_1 = require("./dtos/return-updated-user.dto");
const return_deleted_user_dto_1 = require("./dtos/return-deleted-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    index() {
        return this.usersService.findAll();
    }
    async findById(id) {
        const user = await this.usersService.find(id);
        if (user === undefined)
            throw new common_1.HttpException('Usuário com o ID inserido não encontrado', common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async create(createUserDto) {
        var repeatedEmail = false;
        const users = await this.usersService.findAll();
        for (let index in users) {
            if (users[index].email == createUserDto.email) {
                repeatedEmail = true;
            }
        }
        if (repeatedEmail == true) {
            throw new common_1.HttpException('Email já existente no banco de dados', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.usersService.create(createUserDto);
        return {
            user,
            message: 'Usuário cadastrado com sucesso',
        };
    }
    async update(id, updateUserDto) {
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
            throw new common_1.HttpException('Usuário com o ID para atualizar inexistente', common_1.HttpStatus.NOT_FOUND);
        }
        if (repeatedEmail == true) {
            throw new common_1.HttpException('Email já existente no banco de dados', common_1.HttpStatus.BAD_REQUEST);
        }
        const updateResult = await this.usersService.update(updateUserDto);
        const updatedUser = await this.usersService.find(updateUserDto.id);
        return {
            updateResult,
            updatedUser,
            message: 'Usuário atualizado com sucesso',
        };
    }
    async delete(id) {
        var foundUser = false;
        const users = await this.usersService.findAll();
        for (let index in users) {
            if (users[index].id == id) {
                foundUser = true;
            }
        }
        if (foundUser == false) {
            throw new common_1.HttpException('Usuário com o ID para deletar inexistente', common_1.HttpStatus.NOT_FOUND);
        }
        const deletedUser = await this.usersService.find(id);
        const deleteResult = await this.usersService.delete(id);
        return {
            deleteResult,
            deletedUser,
            message: 'Usuário deletado com sucesso',
        };
    }
    async login(req) {
        return this.authService.login(req.user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lista todos os usuários registrados no banco de dados'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Retorna com sucesso todos os usuários registrados',
        type: users_entity_1.User,
        isArray: true
    }),
    openapi.ApiResponse({ status: 200, type: [require("./users.entity").User] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "index", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Procura um usuário a partir do ID inserido como parâmetro'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do usuário que deseja buscar no banco de dados',
        type: 'integer'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Usuário encontrado com sucesso a partir do ID inserido',
        type: users_entity_1.User
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'ID inserido não possui um usuário atrelado a ele'
    }),
    openapi.ApiResponse({ status: 200, type: require("./users.entity").User }),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_2.Post)('createUser'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria um usuário novo e insere no banco de dados'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Usuário cadastrado com sucesso',
        type: return_user_dto_1.ReturnUserDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Email já existente no banco de dados, email fora do modelo válido de email, email com mais de 200 caracteres, senha com menos de 6 caracteres',
    }),
    (0, swagger_1.ApiBody)({
        description: "Corpo da requisição para criação de um usuário",
        type: create_user_dto_1.CreateUserDto
    }),
    openapi.ApiResponse({ status: 201, type: require("./dtos/return-user.dto").ReturnUserDto }),
    __param(0, (0, common_2.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_2.Put)('updateUser/:id'),
    (0, swagger_1.ApiBody)({
        description: "Corpo da requisição para atualização de um usuário",
        type: update_user_dto_1.UpdateUserDto
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualiza um usuário a partir do ID dele'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do usuário que deseja atualizar no banco de dados',
        type: 'integer'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Usuário atualizado com sucesso a partir do ID inserido',
        type: return_updated_user_dto_1.ReturnUpdatedUserDto
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Email já existente no banco de dados, email fora do modelo válido de email, email com mais de 200 caracteres, senha com menos de 6 caracteres',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Usuário com o ID para atualizar não encontrado'
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/return-updated-user.dto").ReturnUpdatedUserDto }),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_2.Delete)('deleteUser/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Deleta um usuário a partir do ID dele'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'O ID do usuário que deseja deletar no banco de dados',
        type: 'integer'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Usuário deletado com sucesso a partir do ID inserido',
        type: return_deleted_user_dto_1.ReturnDeletedUserDto
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Usuário com o ID para deletar não encontrado'
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/return-deleted-user.dto").ReturnDeletedUserDto }),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiBody)({
        description: "Corpo da requisição para login de um usuário",
        type: create_user_dto_1.CreateUserDto
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Se loga com um usuário e retorna o token de acesso JWT'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Usuário logado com sucesso a partir do ID inserido',
        type: String
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Usuário e senha não correspondem no banco de dados'
    }),
    (0, common_2.Post)('/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map