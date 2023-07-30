import { Controller, Post , Body , Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { getOtpDto } from './dto/getOtp.dto'
import { jwtAuthGuard } from 'src/guard/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('getOtp')
  getOtp(@Body() getOtpDto:getOtpDto){
    return this.authService.getOtp(getOtpDto)
  }
  @Post('login')
  login(@Body() loginDto : LoginDto , @Res({passthrough: true}) response){
    return this.authService.login(loginDto,response);
  }
  @Post('logout')
  @UseGuards(jwtAuthGuard)
  logout(@Res({passthrough: true}) response){
    return this.authService.logout(response);
  }
}