import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(private userservice: UserService) {}
  async getMe(user) {
    const userdata = user;
    delete userdata['password'];
    delete userdata['role'];
    delete userdata['createdAt'];
    delete userdata['updatedAt'];
    return userdata;
  }
  async allUsers(): Promise<UserEntity[] | { message: string }> {
    const userData = await this.userservice.allUser();
    const users = userData.filter((user) => user.role !== 'admin');

    if (users.length === 0) {
      return { message: 'There are no users!' };
    }
    return users;
  }
  async allManagers(): Promise<UserEntity[] | { message: string }> {
    const userData = await this.userservice.allUser();
    const users = userData.filter((user) => user.role === 'manager');

    if (users.length === 0) {
      return { message: 'There are no Manager!' };
    }
    return users;
  }
  async allSellers(): Promise<UserEntity[] | { message: string }> {
    const userData = await this.userservice.allUser();
    const users = userData.filter((user) => user.role === 'seller');

    if (users.length === 0) {
      return { message: 'There are no Seller!' };
    }
    return users;
  }
  async allCustomers(): Promise<UserEntity[] | { message: string }> {
    const userData = await this.userservice.allUser();
    const users = userData.filter((user) => user.role === 'customer');

    if (users.length === 0) {
      return { message: 'There are no Customer!' };
    }
    return users;
  }
}
