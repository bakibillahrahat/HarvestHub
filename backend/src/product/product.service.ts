import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EditProductDto, ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}
  // add products
  async addProduct(dto: ProductDto): Promise<ProductEntity> {
    const id = `product_${Math.floor(Math.random() * 2365)}`;
    const data = {
      id: id,
      name: dto.name,
      price: dto.price,
      description: dto.description,
      productImage: dto.productImage,
    };
    return this.productRepo.save(data);
  }
  // find all products
  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepo.find();
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
}
