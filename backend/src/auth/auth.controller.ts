import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IParamId } from 'src/users/interfaces/param-id';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Controller('api/users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('')
  async findAll() {
    return this.userService.findAll();
  }

  @Post('signup')
  async register(@Body() body: any) {
    console.log('auth-CONTROLLER signup === ', body);
    return this.authService.register(body);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: any) {
    console.log('auth-CONTROLLER signin ', req.user);
    return this.authService.login(req.user)
    // return 'LOGIN';
  }
  
  @Delete(':id')
  public delete(@Param() { id }: IParamId): Promise<UserDocument> {
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('testtoken')
  testtoken() {
    return this.authService.testtoken()
  }
}
