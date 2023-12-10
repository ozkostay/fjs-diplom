import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IParamId } from 'src/users/interfaces/param-id';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ICreateUserDto } from 'src/users/interfaces/dto/create-user';
import { IUserFromFrontDto } from 'src/users/interfaces/dto/userFromFront';

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('/admin/users')
  findAll(@Query() params :any) {
    return this.userService.findAll(params);
  }

  @Post('/auth/signup')
  async register(@Body() body: IUserFromFrontDto) {
    console.log('auth-CONTROLLER signup === ', body);
    return this.authService.register(body);
  }

  @Post('/auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: any) {
    console.log('auth-CONTROLLER signin ', req.user);
    return this.authService.login(req.user)
  }
  
  @Delete('/admin/users/:id')
  public delete(@Param() { id }: IParamId): Promise<UserDocument> {
    console.log('USER DELETE', id);
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('testtoken')
  testtoken() {
    return this.authService.testtoken()
  }
}
