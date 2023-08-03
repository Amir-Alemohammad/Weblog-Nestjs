import {Controller , Get , UseGuards , Request , Param} from "@nestjs/common"
import {ApiTags} from "@nestjs/swagger"
import { UsersService } from "./users.service"
import { jwtAuthGuard } from "src/guard/jwt-auth.guard"


@ApiTags("User")
@Controller("User")
export class UserController{
    constructor(
        private readonly userService: UsersService
    ){}

    @Get("profile")
    @UseGuards(jwtAuthGuard)
    getProfile(@Request() request) {
        return this.userService.getProfile(request);
    } 

}