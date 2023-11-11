import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ICreateUserDto } from 'src/users/interfaces/dto/create-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('auth.service.validateUser', email, pass);
    const user = await this.usersService.findOne(email);
    // хэшируем pass для проверки
    // const saltOrRounds = 10;
    // const hash = await bcrypt.hash(pass.trim(), saltOrRounds);
    // console.log('auth.service.validateUser hash', hash);
    // pass = hash;

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    console.log('isMatch', isMatch);
    // if (user && user.passwordHash === pass) {
      if (user && isMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: String(user._id)};
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(userNew: ICreateUserDto) {
    const user = await this.usersService.createUser(userNew);
    if (!user) {
      return { statusCode: 401, message: 'Пользователь с таким именем уже есть!!!'}
    } 
    const payload = { email: user.email, id: String(user._id)};
    const { passwordHash, ...result } = user;
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  createToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  testtoken() {
    return { statusCode: 200, message: 'Успешный доступ к закрытой странице'};
  }
}
