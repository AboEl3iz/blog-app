import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDTO } from './dto/refreshtoken.dto';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { Console } from 'console';

import { ApiOperation, ApiResponse, ApiTags,ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('signup')
  Signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.Sigup(createAuthDto);
  }

  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 400, description: 'Invalid credentials.' })
  @Post('login')
  Login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @ApiOperation({ summary: 'Refresh JWT token' })
  @ApiResponse({ status: 200, description: 'Token successfully refreshed.' })
  @ApiResponse({ status: 400, description: 'Invalid refresh token.' })
  @Post('refresh')
  refreshToken(@Body() refreshDTo: RefreshTokenDTO) {
    return this.authService.refreshToken(refreshDTo);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Get('profile')
  GetProfile(@Req() req) {
    return this.authService.getProfile(req.user.userId);
  }
}
