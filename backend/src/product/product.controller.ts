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
  Param,
  Put,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ProductService } from './product.service';
import { EditProductDto, ProductDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private productservice: ProductService) {}
  @Get('viewproducts')
  async allProduct() {
    const products = this.productservice.findAll();
    if ((await products).length === 0) {
      throw new ForbiddenException('There are no product!');
    }
    return products;
  }
  @Get('/:id')
  getUserById(@Param('id') productID: string) {
    const product = this.productservice.findById(productID);
    if (!product) {
      throw new ForbiddenException('Product Not found!');
    }
    return product;
  }
  @Get('productsinventory/:id')
  getInventory(@Param('id') productID: string) {
    return this.productservice.getInventoryProduct(productID);
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
  @Put('editproduct/:id')
  editProduct(@Param('id') id: string, @Body() dto: EditProductDto) {
    return this.productservice.editProduct(id, dto);
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productservice.deleteProduct(id);
  }
}
