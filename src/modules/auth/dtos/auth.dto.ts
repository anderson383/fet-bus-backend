import { IsNotEmpty, IsString, IsEmail, IsIn, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email del usuario', example: 'john_doe@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Contraseña del usuario', example: 'holomundo' })
  password: string;
}


export class AuthCreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Documento del usuario', example: '10000000000' })
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'john_doe@gmail.com' })
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Apellidos completo del usuario', example: 'john_doe@gmail.com' })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email del usuario', example: 'john_doe@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Contraseña del usuario', example: 'holomundo' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Código de registro universidad', example: 'john_doe@gmail.com' })
  code_student: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tipo de sangre', example: 'john_doe@gmail.com' })
  rh: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'Código del programa', example: '' })
  code_program: string;
}
