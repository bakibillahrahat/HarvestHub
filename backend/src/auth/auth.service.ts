import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Userdto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async singUp(dto: Userdto, role: string) {
    const password = dto.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = Math.floor(Math.random() * 1000);
    const data = {
      id: id,
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone,
      address: dto.address,
      avater: dto.avater,
      role: role,
    };

    try {
      const user = this.userRepo.save(data);
      delete (await user).password;
      return user;
    } catch (err) {
      if (err.code == 23505) {
        throw new ForbiddenException('User already exists!');
      }
      throw err;
    }
  }
  async signIn(dto: AuthDto) {
    // find the user
    const user = await this.userRepo.findOneBy({ email: dto.email });
    // if user is not exist throw exception
    if (!user) throw new ForbiddenException('Invalid Credentials!');
    // compare password
    const passMatches = bcrypt.compare(dto.password, user.password);
    // if password incorrect throw exception
    if (!passMatches) throw new ForbiddenException('Invalid Credentials!');
    // send back th user

    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
