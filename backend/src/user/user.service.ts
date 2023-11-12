<<<<<<< HEAD
import { Body, Injectable, Param } from '@nestjs/common';
=======
import { Body, ForbiddenException, Injectable, Param } from '@nestjs/common';
>>>>>>> development
import { EditUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
<<<<<<< HEAD
=======
import * as bcrypt from 'bcrypt';
>>>>>>> development

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
<<<<<<< HEAD
  async editUser(id: number, @Body() dto: EditUserDto): Promise<UserEntity> {
    const user = this.userRepo.update(id, dto);
    // delete user['password'];
    return this.userRepo.findOneBy({ id });
=======
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

  async getUserByID(id: string): Promise<UserEntity> {
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

  async deleteUser(id: string): Promise<object> {
    const user = await this.getUserByID(id);
    if (!user) {
      throw new ForbiddenException('User Not found!');
    }
    await this.userRepo.delete(user['id']);
    return { msg: 'User Delete Successfully!' };
>>>>>>> development
  }
}
