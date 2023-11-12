import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
<<<<<<< HEAD

@Module({
  imports: [AuthModule],
=======
import { UserModule } from 'src/user/user.module';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [AuthModule, UserModule],
>>>>>>> development
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
