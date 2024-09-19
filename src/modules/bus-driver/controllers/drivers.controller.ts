import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { UserService } from "src/modules/user/services/user.service";


@Controller('drivers')
@ApiTags('Controlador de usuarios conductores')
@UseGuards(AuthGuard)
export class DriversController{
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({
        summary: 'Obtener todos los usuarios con rol de conductor.',
    })
    getAllDrivers(){
        return this.userService.findAllDrivers();
    }
}