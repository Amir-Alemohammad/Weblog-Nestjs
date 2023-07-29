import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/register.dto';
import * as bcrypt from "bcryptjs"
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { getOtpDto } from './dto/getOtp.dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly maileService : MailerService,
        ){}
    
    async registerUser(registerDto:registerDto){
         const user = await this.userService.findUserByEmail(registerDto.email);
         if(user){
            throw new HttpException("User Already Exists!",HttpStatus.BAD_REQUEST);
         }
         else{
            registerDto.password = await bcrypt.hash(registerDto.password , 10);
            return await this.userService.createUser(registerDto);
         }   
    }

    async getOtp(getOtpDto:getOtpDto){
        const code = Math.floor(Math.random() * 90000 + 10000);

        const user = await this.userService.findUserByEmail(getOtpDto.email);
        
        if(!user) throw new HttpException("There is no user with this email",HttpStatus.NOT_FOUND);

        const updateResult = await this.userService.updateUser(user.email,code)
        const maileOption = {
            from: "amirho3inalemohammad@gmail.com",
            to: user.email,
            subject: "Validation Code",
            text: String(code),
        }
        this.maileService.sendMail(maileOption)
        return {
            statusCode: 200,
            message: "The validation code has been sent to your email",
        }   
    }
    
    async login(loginDto:LoginDto){
        const user = await this.userService.findUserByEmail(loginDto.email);

        if(!user) throw new HttpException("There is no user with this email",HttpStatus.NOT_FOUND);

        if(user.code !== loginDto.code) throw new HttpException("The entered code is not correct",HttpStatus.BAD_REQUEST);
        
        const token = this.jwtService.sign({
            email: user.email,
            id: user.id,
        },{
            expiresIn: "24h",
            secret: process.env.JWT_SECRET
        });
        return{
            statusCode: 200,
            accessToken : token,
        }
    }


}
