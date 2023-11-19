import { Body, ForbiddenException, Injectable } from '@nestjs/common';
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
  async allUser(role: string): Promise<UserEntity[]> {
    const users = await this.userRepo.find({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        address: true,
        avater: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (role === 'users') {
      return users.filter((user) => user.role !== 'admin');
    } else if (role === 'manager') {
      return users.filter((user) => user.role === 'manager');
    } else if (role === 'seller') {
      return users.filter((user) => user.role === 'seller');
    } else if (role === 'customer') {
      return users.filter((user) => user.role === 'customer');
    } else {
      return users;
    }
  }

  async getUserByID(id: string): Promise<UserEntity> {
    const user = this.userRepo.findOneBy({ id: id });
    if (!user) throw new ForbiddenException('No such user found!');
    return user;
  }

  async editUser(id: string, @Body() dto: EditUserDto): Promise<object> {
    const password = dto.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    dto.password = hashedPassword;

    const user = this.userRepo.update(id, dto);
    return user;
  }

  async deleteUser(id: string): Promise<object> {
    const user = await this.getUserByID(id);
    if (!user) {
      throw new ForbiddenException('User Not found!');
    }
    await this.userRepo.delete(user['id']);
    return { msg: 'User Delete Successfully!' };
  }

  async getSellerProduct(id: string): Promise<UserEntity[]> {
    return this.userRepo.find({
      where: { id: id },
      relations: {
        products: true,
      },
    });
  }
}
