import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateUserDto } from './interfaces/dto/create-user';
import { IUpdateUserDto } from './interfaces/dto/update-user';
import * as bcrypt from 'bcrypt';
import { IUserFromFrontDto } from './interfaces/dto/userFromFront';

// export type User = any;
// @InjectConnection() private connection: Connection,

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  // ===========================================================
  public findAll(): Promise<UserDocument[]> {
    return this.UserModel.find().exec();
  }

  // ===========================================================
  public async createUser(data: IUserFromFrontDto): Promise<UserDocument> {
    // хэшируем пароль
    const saltOrRounds = 10;
    const password = data.passwordHash;
    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log('createUser', hash);
    const newData = {
      email: data.email,
      passwordHash: hash,
      name: data.name,
      contactPhone: data.contactPhone,
      role: data.role,
    };
    const user = this.UserModel.create(newData);
    return user;
  }

  // ===========================================================
  public delete(id: string): Promise<UserDocument> {
    return this.UserModel.findOneAndDelete({ _id: id });
  }

  // ===========================================================
  public update(id: string, data: IUpdateUserDto): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ _id: id }, data);
  }

  // ===========================================================
  // async findOne(email: string): Promise<User | undefined> {
  async findOne(email: string): Promise<any> {
    console.log('USER-SERVICE ===', email);
    // return 'finOne';
    return this.UserModel.findOne({ email: email }).exec();
  }
}
