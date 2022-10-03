import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @ApiHideProperty()
  id: number;

  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido (exemplo@email.com)',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  email: string;

  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  password: string;
}