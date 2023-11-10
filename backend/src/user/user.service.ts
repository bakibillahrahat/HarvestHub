import { Body, ForbiddenException, Injectable, Param } from '@nestjs/common';
import { EditUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async allUser(): Promise<UserEntity[]> {
    return await this.userRepo.find({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        address: true,
        avater: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserByID(id: number): Promise<UserEntity> {
    const user = this.userRepo.findOneBy({ id: id });
    delete (await user).password;
    return user;
  }

  async editUser(id: number, @Body() dto: EditUserDto): Promise<object> {
    const password = dto.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    dto.password = hashedPassword;

    const user = this.userRepo.update(id, dto);
    return user;
  }

  async deleteUser(id: number): Promise<object> {
    const user = this.getUserByID(id);
    if (!user) {
      throw new ForbiddenException('User Not found!');
    }
    await this.userRepo.delete(user['id']);
    return { msg: 'User Delete Successfully!' };
  }
}
