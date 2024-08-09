// src/users/users.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.usersService.create(user);
  }
}
