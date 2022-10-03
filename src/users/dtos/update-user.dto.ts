import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiHideProperty()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido (exemplo@email.com)',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;
}