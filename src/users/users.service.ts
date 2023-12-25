import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './users.model';
// import { User } from './users.model';

@Injectable()
export class UsersService {
  //   users: User[] = [];

  constructor(
    @InjectModel('User') private readonly User: Model<UserInterface>,
  ) {}

  //   private findUser(id: string) {
  // const userIndex = this.users.findIndex((el) => el.id === id);
  // if (userIndex === -1) {
  //   throw new NotFoundException('User not found');
  // }
  // return userIndex;
  //   }

  async insertUser(name: string, email: string, password: string) {
    // const id = Date.now().toString(32);
    // const passwordhash = await bcrypt.hash(password, 12);

    // const newUser = new User(id, name, email, passwordhash);

    // this.users.push(newUser);

    // return newUser;
    const passwordhash = await bcrypt.hash(password, 12);

    const newUser = await this.User.create({
      name,
      email,
      password: passwordhash,
    });

    return newUser;
  }

  async getUsers() {
    // return this.users.map((el) => ({
    //   id: el.id,
    //   name: el.name,
    //   email: el.email,
    //   passwordHash: el.password,
    // }));
    const users = await this.User.find().lean();

    return users;
  }

  async getUserById(id: string) {
    // const userIndex = this.findUser(id);

    // return {
    //   id: this.users[userIndex].id,
    //   name: this.users[userIndex].name,
    //   email: this.users[userIndex].email,
    // };
    const user = await this.User.findById(id).lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUserNameById(id: string, name: string) {
    // const userIndex = this.findUser(id);

    // this.users[userIndex].name = name;

    // return {
    //   id: this.users[userIndex].id,
    //   name: this.users[userIndex].name,
    //   email: this.users[userIndex].email,
    // };
    const user = await this.User.findByIdAndUpdate(id, { name }).lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteUserById(id: string) {
    // this.findUser(id);

    // this.users = this.users.filter((el) => el.id !== id);

    // return { id: id };

    const user = await this.User.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
