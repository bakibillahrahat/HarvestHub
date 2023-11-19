import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto, Userdto } from './dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authservice: AuthService,
  ) {}
  @Get('viewusers')
  allUser(): Promise<UserEntity[]> {
    return this.userService.allUser('users');
  }
  @Get('managers')
  viewManager() {
    return this.userService.allUser('manager');
  }
  @Get('customers')
  viewCustomer() {
    return this.userService.allUser('customer');
  }
  @Get('sellers')
  viewSellers() {
    return this.userService.allUser('seller');
  }
  @Get('/:id')
  searchUserBy(@Param('id') userID: string): Promise<UserEntity> {
    const user = this.userService.getUserByID(userID);
    return user;
  }
  @Get('/sellerproduct/:id')
  getSellerProduct(@Param('id') sellerID: string) {
    return this.userService.getSellerProduct(sellerID);
  }
  @Post('manager')
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
    return this.authservice.singUp(dto, 'manager');
  }
  @Put('edituser/:id')
  editUser(@Param('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
