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
exports.Events = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const database_files_entity_1 = require("../database-files/database-files.entity");
const typeorm_1 = require("typeorm");
let Events = class Events {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, eventDate: { required: true, type: () => Date }, eventName: { required: true, type: () => String }, eventResponsible: { required: true, type: () => String }, eventCity: { required: true, type: () => String }, eventState: { required: true, type: () => String }, eventAddress: { required: true, type: () => String }, eventAddressComplement: { required: true, type: () => String }, eventEmail: { required: true, type: () => String }, eventPhone: { required: true, type: () => Number }, eventImageId: { required: false, type: () => Number } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Events.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'timestamptz' }),
    __metadata("design:type", Date)
], Events.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventResponsible", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventAddressComplement", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Events.prototype, "eventEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'integer' }),
    __metadata("design:type", Number)
], Events.prototype, "eventPhone", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'eventImageId' }),
    (0, typeorm_1.OneToOne)(() => database_files_entity_1.default, {
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Events.prototype, "eventImageId", void 0);
Events = __decorate([
    (0, typeorm_1.Entity)()
], Events);
exports.Events = Events;
//# sourceMappingURL=events.entity.js.map