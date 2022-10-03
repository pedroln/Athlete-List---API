import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdateEventDto {
    @ApiHideProperty()
    id: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString({},
        {
        message: "Informe uma data válida (YYYY-MM-DD)"}
        )
    eventDate: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O nome do evento deve ter menos de 200 caracteres',
    })
    eventName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O nome do responsável deve ter menos de 200 caracteres',
    })
    eventResponsible: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O nome da cidade deve ter menos de 200 caracteres',
    })
    eventCity: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O nome do estado deve ter menos de 200 caracteres',
    })
    eventState: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O endereço deve ter menos de 200 caracteres',
    })
    eventAddress: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O complemento do endereço deve ter menos de 200 caracteres',
    })
    eventAddressComplement: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail(
        {},
        {
        message: 'Informe um endereço de email válido',
    })
    @MaxLength(200, {
        message: 'O endereço de email deve ter menos de 200 caracteres',
    })
    eventEmail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(8, {
        message: 'O telefone deve ter no mínimo 8 caracteres',
    })
    @MaxLength(9, {
        message: 'O telefone deve ter no máximo 9 caracteres',
    })
    eventPhone: number;

    @ApiHideProperty()
    @IsOptional()
    eventImageid: number;
}