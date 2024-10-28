import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserCreateDto {
  
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    document: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    rol: string;

    @IsOptional()
    @IsString()
    code_student?: string;

    @IsOptional()
    @IsString()
    birthdate?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsUUID()
    eps_id?: string;

    @IsOptional()
    @IsUUID()
    rh_id?: string;

    @IsOptional()
    @IsUUID()
    program_academic_id?: string;
}

export class UpdateUserDto extends PartialType(UserCreateDto) {}