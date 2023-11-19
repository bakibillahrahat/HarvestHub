import { Injectable } from '@nestjs/common';
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
}
