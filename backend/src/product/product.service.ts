import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EditProductDto, ProductDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    private userservice: UserService,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}
  // add products
  async addProduct(dto: ProductDto): Promise<ProductEntity> {
    const id = `product_${Math.floor(Math.random() * 2365)}`;
    const product = new ProductEntity();
    product.id = id;
    product.name = dto.name;
    product.price = dto.price;
    product.description = dto.description;
    product.productImage = dto.productImage;
    product.seller = await this.userservice.getUserByID(dto.sellerId);

    return this.productRepo.save(product);
  }
  // find all products
  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepo.find({
      relations: {
        seller: true,
      },
    });
  }
  // find product by product id
  async findById(id: string): Promise<ProductEntity> {
    return this.productRepo.findOneBy({ id: id });
  }
  // update product info
  async editProduct(id: string, @Body() dto: EditProductDto): Promise<object> {
    const product = await this.findById(id);
    if (!product) {
      throw new ForbiddenException('Product Not found!');
    }
    const updatedProduct = this.productRepo.update(id, dto);
    return updatedProduct;
  }
  // delete product
  async deleteProduct(id: string): Promise<object> {
    const product = await this.findById(id);
    if (!product) {
      throw new ForbiddenException('Product Not found!');
    }
    await this.productRepo.delete(product['id']);
    return { msg: 'Product Deleted Successfully!' };
  }

  async getInventoryProduct(id: string): Promise<ProductEntity[]> {
    return this.productRepo.find({
      where: { id: id },
      relations: { inventory: true },
    });
  }
}
