import { Controller, Post , Body , Request, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { getOtpDto } from './dto/getOtp.dto'
import { jwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ApiTags , ApiConsumes , ApiBody } from '@nestjs/swagger';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('getOtp')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    description: 'get otp code with email',
    type: getOtpDto,
    required:true,
  })
  getOtp(@Body() getOtpDto:getOtpDto){
    return this.authService.getOtp(getOtpDto)
  }

  
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    description:"login with otp code",
    type: LoginDto,
    required: true
  })
  @Post('login')
  login(@Body() loginDto : LoginDto , @Res({passthrough: true}) response){
    return this.authService.login(loginDto,response);
  }


  @Post('logout')
  @UseGuards(jwtAuthGuard)
  logout(@Res({passthrough: true}) response){
    response.clearCookie("access_token");
        return {
            statusCode: HttpStatus.OK,
            message: "You have successfully logged out"
        }
  }
}