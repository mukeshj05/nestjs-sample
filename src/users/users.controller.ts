import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ _id: Types.ObjectId; name: string; email: string }> {
    const user = await this.usersService.insertUser(name, email, password);
    return { _id: user._id, name: user.name, email: user.email };
  }

  @Get()
  async getUsers(): Promise<
    { _id: Types.ObjectId; name: string; email: string }[]
  > {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<{ _id: Types.ObjectId; name: string; email: string }> {
    const user = await this.usersService.getUserById(id);
    return user;
  }

  @Patch(':id')
  async updateUserNameById(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<{ _id: Types.ObjectId; name: string; email: string }> {
    const user = await this.usersService.updateUserNameById(id, name);
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ _id: Types.ObjectId }> {
    await this.usersService.deleteUserById(id);
    return { _id: new Types.ObjectId(id) };
  }
}
