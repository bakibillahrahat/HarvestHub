import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
