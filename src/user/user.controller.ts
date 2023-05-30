import { Controller, Post, Get, Delete, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Req() request: Request) {
    const createUserResponse = await this.userService.createUser(request.body);
    // TODO: Send email and RabbitMQ event (dummy implementation)
    return createUserResponse;
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string) {
    return this.userService.getAvatar(userId);
  }

  @Delete(':userId/avatar')
  async deleteAvatar(@Param('userId') userId: string) {
    let deleteResponse = await this.userService.deleteAvatar(userId);
    // TODO: Remove file from the FileSystem storage and the stored entry from the database
    return deleteResponse;
  }
}

