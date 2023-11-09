import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  findAll(): any {
    return 'users servise findAll'
  }

  create() : any {
    return 'users servise create'
  }
}

// interface IUserService {
//   findAll(params: SearchUserParams): Promise<User[]>;
//   create(data: Partial<User>): Promise<User>;
//   findById(id: ID): Promise<User>;
//   findByEmail(email: string): Promise<User>;
// }
