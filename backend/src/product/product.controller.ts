import {
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private productservice: ProductService) {}
  @Get('viewproducts')
  allProduct() {
    return this.productservice.findAll();
  }
  @Post('addproduct')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('productImage', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 8000000 },
      storage: diskStorage({
        destination: './upload/product',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  addProduct(
    @Body() dto: ProductDto,
    @UploadedFile() productImage: Express.Multer.File,
  ) {
    dto.productImage = productImage.filename;
    return this.productservice.addProduct(dto);
  }
}
