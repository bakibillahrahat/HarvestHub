/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
<<<<<<< HEAD
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userRepo.findOneBy({
      id: payload.sub,
    });
    delete user.password
=======
  async validate(payload: { sub: string; email: string }) {
    const user = await this.userRepo.findOneBy({
      id: payload.sub,
    });

>>>>>>> development
    return user;
  }
}
