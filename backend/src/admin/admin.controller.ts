import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
// import { JwtGuard } from 'src/auth/guard';
import { EditUserDto, Userdto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private userService: UserService,
    private authService: AuthService,
  ) {}
  // @UseGuards(JwtGuard)
  // Admin Personal Info Route
  @Get('me')
  getMe(@Req() req: Request) {
    return this.adminService.getMe(req.user);
  }
  @Put('editinfo/:id')
  updateAdminPersonalInf(@Param('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
}
