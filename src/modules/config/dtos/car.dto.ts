import { IsNotEmpty, IsString, IsEmail, IsIn, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CarCreateDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tipo de carro', example: '790389ce-ad78-4511-87ef-4946327c421b' })
  type: string;


  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'Empresa del carro', example: '790389ce-ad78-4511-87ef-4946327c421b' })
  company: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Placa del usuario', example: 'john_doe@gmail.com' })
  placa: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Color', example: 'john_doe@gmail.com' })
  color: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Capacidad de pasajeros en número del carro', example: '23' })
  size: number;
}


export class CarUpdateDto extends CarCreateDto {
  
}