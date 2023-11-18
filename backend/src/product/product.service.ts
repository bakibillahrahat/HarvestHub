import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto';

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
  async findById(id) {
    return this.productRepo.findOneBy(id);
  }
  // update product info
  async editProduct() {}
  // delete product
  async deleteProduct() {}
}
