import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = user.get<UsersController>(UsersController);
  });

  describe('users', () => {
    it('should return id name email', async () => {
      expect(
        await usersController.addUser('Mukesh', 'mukesh@gmail.com', ''),
      ).toMatchObject({
        name: 'Mukesh',
        email: 'mukesh@gmail.com',
      });
    });
  });

  describe('users', () => {
    it('should return array of id name email', async () => {
      expect(await usersController.getUsers()[0]).toMatchSnapshot({
        _id: expect.any(Types.ObjectId),
      });
    });
  });
});
