import { Controller, Get, Body, Put, Param, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
// import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
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
  @Get('me/:id')
  getMe(@Param('id') id: string) {
    return this.adminService.getMe(id);
  }
  @Put('editinfo/:id')
  updateAdminPersonalInf(@Param('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
}
