import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { StudentGuard } from "src/modules/auth/guards/student.guard";
import { UserService } from "src/modules/user/services/user.service";
import { StudentService } from "../services/student.service";
import { CreateListQrDto } from "../dtos/student.dto";


@Controller('student-handler')
@ApiTags('Controlador de estudantes')
@UseGuards(AuthGuard, StudentGuard)
export class StudentController{
    constructor(private readonly studentService: StudentService) {}

    @Post('save-list-for-qr')
    @ApiOperation({
        summary: 'Guarda la lista de estudiantes que leen el qr',
    })
    savingListDriverForQr(@Req() req,  @Body() data: CreateListQrDto) {
        this.studentService.userId = req.user.id;
        return this.studentService.savingListDriverForQr(data);
    }


    @Post('get-bus-driver')
    @ApiOperation({
        summary: 'OBtiene el listado de bus driver activos para los estudiantes',
    })
    getBusDriver(@Req() req) {
        this.studentService.userId = req.user.id;
        return this.studentService.getActiveBusDriver();
    }
}