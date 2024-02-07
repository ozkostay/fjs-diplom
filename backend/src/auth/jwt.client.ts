import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtClient extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('==== JwtAdmin === user', user);
    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован.')
    } else if (user && user.role !== 'client') {
      throw new ForbiddenException('Пользователю запрещено выполнять этот запросю')
    }
    return user;
  }
}
