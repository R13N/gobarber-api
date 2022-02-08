import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
