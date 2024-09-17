import { IsString, IsNumber } from "class-validator";


export class CreatePlanDto {
    @IsString()
    name: string;

    @IsNumber()
    amount_perday: number;

    @IsNumber()
    equals_day: number;    
}
