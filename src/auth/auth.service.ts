import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { getOtpDto } from './dto/getOtp.dto';
import { functions } from 'src/utils/functions';
import { randomInt } from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly functions: functions,
    ) { }
    async getOtp(getOtpDto: getOtpDto) {
        const code = randomInt(90000 + 10000);
        console.log(code)
        const user = await this.userService.findUserByEmail(getOtpDto.email);
        if (!user) {
            const createUser = await this.userService.createUser(getOtpDto);
            await this.userService.updateUserOtpCode(createUser.email, code)
            this.functions.SendEmail(createUser.email, code)
        } else {
            const updateResult = await this.userService.updateUserOtpCode(user.email, code)
            this.functions.SendEmail(user.email, code)
        }
        return {
            statusCode: HttpStatus.OK,
            message: "The validation code has been sent to your email",
        }
    }
    async login(loginDto: LoginDto, response) {
        const user = await this.userService.findUserByEmail(loginDto.email);
        if (!user) throw new HttpException("There is no user with this email", HttpStatus.NOT_FOUND);
        if (user.code !== +loginDto.code) throw new HttpException("The entered code is not correct", HttpStatus.BAD_REQUEST);
        const token = this.jwtService.sign({
            email: user.email,
            id: user.id,
            Role: user.Role,
        }, {
            expiresIn: "24h",
            secret: process.env.JWT_SECRET
        });
        this.userService.updateUserToken(user.email, token);
        response.cookie("access_token", token)
        return {
            statusCode: HttpStatus.OK,
            message: "Login was successful!"
        }
    }
}
