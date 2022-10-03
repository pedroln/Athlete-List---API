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
exports.ReturnUpdatedEventDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
class ReturnUpdatedEventDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { updateResult: { required: true, type: () => require("typeorm/query-builder/result/UpdateResult").UpdateResult }, updatedEvent: { required: true, type: () => require("../events.entity").Events }, message: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeorm_1.UpdateResult)
], ReturnUpdatedEventDto.prototype, "updateResult", void 0);
exports.ReturnUpdatedEventDto = ReturnUpdatedEventDto;
//# sourceMappingURL=return-updated-event.dto.js.map