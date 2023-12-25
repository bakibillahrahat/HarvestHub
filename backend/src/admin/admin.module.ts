import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
