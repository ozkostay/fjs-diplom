import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "./auth/jwt.auth.guard";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): any{
    return this.appService.getHello();
  }

  @Get('/token')
  getToken(): string {
    console.log('app.cont 222');
    return this.authService.createToken({ username: 'Maria', sub: 2 });
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/login')
  // @UseGuards(AuthGuard('local'))
  // async login(@Request() req) {
  //   console.log('APP-CONTROLLER=== ', req.user);
  //   return req.user;
  // }
}
