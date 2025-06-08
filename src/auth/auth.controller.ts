import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDTO } from './dto/refreshtoken.dto';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { Console } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  Signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.Sigup(createAuthDto);
  }

  @Post("login")
  Login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post("refresh")
  refreshToken(@Body() refreshDTo: RefreshTokenDTO) {
    return this.authService.refreshToken(refreshDTo);
  }

  //JWT Protected Route
  @UseGuards(AuthenticationGuard)
  @Get("profile")
  GetProfile(@Req() req) {
    
    return this.authService.getProfile(req.user.userId);
  }

  
}
