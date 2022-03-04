import { Controller, Get, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { phoneToPhones } from './helper';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  async getUsers() {
    return await this.appService.prismaService.user.findMany();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    const result = await this.authService.login(req.user, req.body);
    return result;
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  async logout(@Request() req) {
    const user = await this.authService.logout(req.user);
    return {
      logout: user !== undefined
    };
  }
}
