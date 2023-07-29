import { Controller, Post , Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { getOtpDto } from './dto/getOtp.dto'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto:registerDto){
    return this.authService.registerUser(registerDto)
  }
  @Post('getOtp')
  getOtp(@Body() getOtpDto:getOtpDto){
    return this.authService.getOtp(getOtpDto)
  }
  @Post('login')
  login(@Body() loginDto : LoginDto){
    return this.authService.login(loginDto);
  }
}