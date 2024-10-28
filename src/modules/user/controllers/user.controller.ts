import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";
import { UpdateUserDto, UserCreateDto } from "../dto/user.dto";

@Controller("users")
@UseGuards(AuthGuard, AdminGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    findAll(){
        return this.userService.findAllUsers();
    }

    @Post()
    create(@Body() userCreateDto: UserCreateDto, @Req() req){
        this.userService.userId = req.user.id;
        return this.userService.createAnyUser(userCreateDto);

    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Req() req){
        this.userService.userId = req.user.id;
        return this.userService.update(id, updateUserDto);
    }

    @Get(":id")
    findOne(@Param("id") id: string){
        return this.userService.findById(id);
    }

    @Delete(":id")
    remove(@Param("id") id: string, @Req() req){
        this.userService.userId = req.user.id;
        return this.userService.deleteById(id);
    }
}