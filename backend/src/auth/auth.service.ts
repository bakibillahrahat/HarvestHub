import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Userdto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwt: JwtService,
    private config: ConfigService,
    private mailobject: MailerService,
  ) {}
  private readonly secretKey: string = this.config.get('JWT_SECRET');
  private readonly blacklist: Set<string> = new Set();
  async singUp(dto: Userdto, role: string) {
    const password = dto.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    let id = '';
    if (role === 'admin') {
      id = `admin_${Math.floor(Math.random() * 100)}`;
    } else if (role === 'manager') {
      id = `manager_${Math.floor(Math.random() * 200)}`;
    } else if (role === 'customer') {
      id = `customer_${Math.floor(Math.random() * 200)}`;
    } else if (role === 'seller') {
      id = `seller_${Math.floor(Math.random() * 200)}`;
    }

    try {
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

      const user = this.userRepo.save(data);
      return this.signToken((await user).id, (await user).email);
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

    return this.signToken((await user).id, (await user).email);
  }
  async signToken(
    userId: string,
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
  async sendEmail(email: string, name: string) {
    return await this.mailobject.sendMail({
      to: `${email}`,
      subject: 'subject of email',
      text: `Hello ${name}.Welcome to our system`,
    });
  }
}
