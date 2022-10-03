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
exports.CreateEventDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEventDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { eventDate: { required: true, type: () => String }, eventName: { required: true, type: () => String, maxLength: 200 }, eventResponsible: { required: true, type: () => String, maxLength: 200 }, eventCity: { required: true, type: () => String, maxLength: 200 }, eventState: { required: true, type: () => String, maxLength: 200 }, eventAddress: { required: true, type: () => String, maxLength: 200 }, eventAddressComplement: { required: true, type: () => String, maxLength: 200 }, eventEmail: { required: true, type: () => String, maxLength: 200 }, eventPhone: { required: true, type: () => Number, minLength: 8, maxLength: 9 } };
    }
}
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)({}, {
        message: "Informe uma data válida (YYYY-MM-DD)"
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe uma data',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventDate", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(200, {
        message: 'O nome do evento deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe o nome do evento',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventName", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(200, {
        message: 'O nome do responsável deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe o nome do responsável pelo evento',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventResponsible", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(200, {
        message: 'O nome da cidade deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe o nome da cidade do evento',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventCity", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(200, {
        message: 'O nome do estado deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe o nome do estado do evento',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventState", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(200, {
        message: 'O endereço deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe o endereço do evento',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200, {
        message: 'O complemento do endereço deve ter menos de 200 caracteres',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventAddressComplement", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, {
        message: 'Informe um endereço de email válido (exemplo@email.com)',
    }),
    (0, class_validator_1.MaxLength)(200, {
        message: 'O endereço de email deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe um endereço de email',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "eventEmail", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'O telefone deve ter no mínimo 8 caracteres',
    }),
    (0, class_validator_1.MaxLength)(9, {
        message: 'O telefone deve ter no máximo 9 caracteres',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Informe um telefone',
    }),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "eventPhone", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "eventImageid", void 0);
exports.CreateEventDto = CreateEventDto;
//# sourceMappingURL=create-event.dto.js.map