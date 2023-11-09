import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @Get('')
  findAll(): any {
    return this.usersServise.findAll();
  }
  // Create
  @Post('')
  create(): any {
    return this.usersServise.create();
  }

  
  // Update
  // Delete
  // Find()
}
  
