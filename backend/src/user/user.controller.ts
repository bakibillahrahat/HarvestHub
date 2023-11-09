import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { Userdto } from './dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  //   constructor(private authService: AuthService) {}
  //   @Post('users/signup')
  //   @UsePipes(new ValidationPipe())
  //   @UseInterceptors(
  //     FileInterceptor('avater', {
  //       fileFilter: (req, file, cb) => {
  //         if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
  //           cb(null, true);
  //         else {
  //           cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //         }
  //       },
  //       limits: { fileSize: 8000000 },
  //       storage: diskStorage({
  //         destination: './upload/avater',
  //         filename: function (req, file, cb) {
  //           cb(null, Date.now() + file.originalname);
  //         },
  //       }),
  //     }),
  //   )
  //   adminSignUp(
  //     @Body() dto: Userdto,
  //     @UploadedFile() avater: Express.Multer.File,
  //   ) {
  //     dto.avater = avater.filename;
  //     return this.authService.singUp(dto, 'admin');
  //   }
}
