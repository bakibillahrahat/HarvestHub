import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
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
import { JwtGuard } from 'src/auth/guard';
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
  @UseGuards(JwtGuard)
  // Admin Personal Info Route
  @Get('me')
  getMe(@Req() req: Request) {
    return this.adminService.getMe(req.user);
  }
  @Put('editinfo/:id')
  updateAdminPersonalInf(@Param('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
  // User Management Route
  @Get('user/viewusers')
  allUser() {
    return this.adminService.allUsers();
  }
  @Get('user/:id')
  searchUserBy(@Param('id') userID: string): Promise<UserEntity> {
    let user = this.userService.getUserByID(userID);
    return user;
  }
  @Post('manager/addmanager/')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('avater', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 8000000 },
      storage: diskStorage({
        destination: './upload/avater',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  addManager(
    @Body() dto: Userdto,
    @UploadedFile() avater: Express.Multer.File,
  ) {
    dto.avater = avater.filename;
    return this.authService.singUp(dto, 'manager');
  }
  @Get('manager/viewmanagers')
  viewManager() {
    return this.adminService.allManagers();
  }
  @Get('seller/viewsellers')
  viewSeller() {
    return this.adminService.allSellers();
  }
  @Get('customer/viewcustomers')
  viewCustomer() {
    return this.adminService.allCustomers();
  }
}
