import { Body, Injectable, Param } from '@nestjs/common';
import { EditUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async editUser(id: number, @Body() dto: EditUserDto): Promise<UserEntity> {
    const user = this.userRepo.update(id, dto);
    // delete user['password'];
    return this.userRepo.findOneBy({ id });
  }
}
