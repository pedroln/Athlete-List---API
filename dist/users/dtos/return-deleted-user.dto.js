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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnDeletedUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
class ReturnDeletedUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { deleteResult: { required: true, type: () => require("typeorm/query-builder/result/DeleteResult").DeleteResult }, deletedUser: { required: true, type: () => require("../users.entity").User }, message: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeorm_1.DeleteResult)
], ReturnDeletedUserDto.prototype, "deleteResult", void 0);
exports.ReturnDeletedUserDto = ReturnDeletedUserDto;
//# sourceMappingURL=return-deleted-user.dto.js.map