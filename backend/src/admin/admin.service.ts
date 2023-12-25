import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private userservice: UserService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async getMe(id): Promise<UserEntity> {
    const users = await this.userRepo.findOneBy({ id: id });
    const userdata = users;
    delete userdata['password'];
    delete userdata['role'];
    delete userdata['createdAt'];
    delete userdata['updatedAt'];
    return userdata;
  }
}
