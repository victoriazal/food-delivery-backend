import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserLoginDto } from '../user/dto/userLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService){}

  @Post('register')
  register(@Body() dto:CreateUserDto): Promise<CreateUserDto>{
    return this.authService.registerUsers(dto)
  }

  @Post('login')
  login(@Body() dto:UserLoginDto): Promise<CreateUserDto>{
    return this.authService.loginUser(dto)
  }
  
}
