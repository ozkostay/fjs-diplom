import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminManager extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('==== JwtAdminManager === user', user);
    const roles = ['admin', 'manager'];
    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован.')
    } else if (user && !roles.includes(user.role)) {
      throw new ForbiddenException('Пользователю запрещено выполнять этот запросю')
    }
    return user;
  }
}
