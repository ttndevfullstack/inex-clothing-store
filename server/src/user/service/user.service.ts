/* eslint-disable @typescript-eslint/no-unused-vars */
import * as argon2 from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserUpdateDto } from '../dto/UserUpdateDto';
import { UserReturnDto } from '../dto/UserReturnDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(email: string): Promise<UserReturnDto | { message }> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return { message: 'User not found!' };
      }
      const { hashPassword, ...userData } = user.toObject();

      return userData;
    } catch (error: any) {
      console.error('Error:', error);
      throw new ForbiddenException('Get user failed!');
    }
  }

  async getAllUser(): Promise<UserReturnDto[] | { message }> {
    try {
      const users = await this.userModel.find().exec();
      if (!users) {
        return { message: 'User not found!' };
      }

      const userList = users.map((user) => {
        const { hashPassword, ...userData } = user.toObject();
        return userData;
      });

      return userList;
    } catch (error: any) {
      console.error('Error:', error);
      throw new ForbiddenException('Get user failed!');
    }
  }

  async getAllMembers(): Promise<UserReturnDto[]> {
    try {
      const members = await this.userModel
        .find({
          $or: [{ role: 'manager' }, { role: 'admin' }, { VIP: true }],
        })
        .exec();
      if (!members) return [];

      const memberList = members.map((member) => {
        const { hashPassword, ...memberData } = member.toObject();
        return memberData;
      });

      return memberList;
    } catch (error: any) {
      console.error('Error:', error);
      throw new ForbiddenException('Get user failed!');
    }
  }

  async updateUser(
    email: string,
    userDto: UserUpdateDto,
  ): Promise<UserReturnDto | { message }> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return { message: 'User not found!' };
      }

      if (userDto.password && userDto.newPassword) {
        const match = await argon2.verify(user.hashPassword, userDto.password);
        if (match) {
          const hash = await argon2.hash(userDto.newPassword);

          user.username = userDto.username;
          user.hashPassword = hash;
          await user.save();
          const { hashPassword, ...userData } = user.toObject();

          return userData;
        }
        return { message: 'Password is not correct!' };
      }

      user.username = userDto.username;
      await user.save();
      const { hashPassword, ...userData } = user.toObject();

      return userData;
    } catch (error: any) {
      console.error('Error:', error);
      throw new ForbiddenException('Update user failed!');
    }
  }

  async deleteUser(email: string): Promise<{ message }> {
    try {
      const deletedUser = await this.userModel.findOneAndDelete({ email });
      if (!deletedUser) {
        return { message: 'User not found!' };
      }
      return { message: 'User deleted successfully!' };
    } catch (error: any) {
      console.error('Error:', error);
      throw new ForbiddenException('Delete user failed!');
    }
  }

  async resetPassword(
    email: string,
    newPassword: string,
  ): Promise<Exclude<User, { type: 'hashPassword' }>> {
    try {
      const hash = await argon2.hash(newPassword);
      const user = await this.userModel.findOneAndUpdate(
        { email },
        { hashPassword: hash },
        { new: true },
      );
      if (user) return user;
    } catch (error: any) {
      console.error('Error:', error);
      throw new ForbiddenException('Delete user failed!');
    }
  }
}
