// src/users/users.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ username: user.username })
      .exec();
    if(existingUser){
      throw new ConflictException('User with this username already exists.');
    }
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(username: string): Promise<UserDocument | undefined | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
