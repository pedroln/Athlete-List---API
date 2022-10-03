import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateEventDto {
    @ApiHideProperty()
    id: number;


    @ApiProperty()
    @IsDateString(
        {},
        {
        message: "Informe uma data válida (YYYY-MM-DD)"
    })
    @IsNotEmpty({
        message: 'Informe uma data',
    })
    eventDate: string;


    @MaxLength(200, {
        message: 'O nome do evento deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe o nome do evento',
    })
    eventName: string;


    @MaxLength(200, {
        message: 'O nome do responsável deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe o nome do responsável pelo evento',
    })
    eventResponsible: string;


    @MaxLength(200, {
        message: 'O nome da cidade deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe o nome da cidade do evento',
    })
    eventCity: string;


    @MaxLength(200, {
        message: 'O nome do estado deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe o nome do estado do evento',
    })
    eventState: string;


    @MaxLength(200, {
        message: 'O endereço deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe o endereço do evento',
    })
    eventAddress: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(200, {
        message: 'O complemento do endereço deve ter menos de 200 caracteres',
    })
    eventAddressComplement: string;


    @IsEmail(
        {},
        {
        message: 'Informe um endereço de email válido (exemplo@email.com)',
    })
    @MaxLength(200, {
        message: 'O endereço de email deve ter menos de 200 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe um endereço de email',
    })
    eventEmail: string;


    @MinLength(8, {
        message: 'O telefone deve ter no mínimo 8 caracteres',
    })
    @MaxLength(9, {
        message: 'O telefone deve ter no máximo 9 caracteres',
    })
    @IsNotEmpty({
        message: 'Informe um telefone',
    })
    eventPhone: number;

    @ApiHideProperty()
    @IsOptional()
    eventImageid: number;
}