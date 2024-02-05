import {
  ExecutionContext,
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
    if (err || !user || !roles.includes(user.role)) {
      console.log('==== JwtAdminManager ===== ERR =============');
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
