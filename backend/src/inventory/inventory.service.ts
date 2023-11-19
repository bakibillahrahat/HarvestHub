import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { InventoryDto, UpdateInventoryDto } from './dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepo: Repository<InventoryEntity>,
    private productService: ProductService,
  ) {}

  async addproductInventory(dto: InventoryDto): Promise<InventoryEntity> {
    try {
      const id = `inventory_${Math.floor(Math.random() * 2365)}`;
      const inventory = new InventoryEntity();
      inventory.id = id;
      inventory.stockLevel = dto.stockLevel;
      inventory.product = await this.productService.findById(dto.productid);
      return this.inventoryRepo.save(inventory);
    } catch (error) {
      throw new Error(`Error creating inventory: ${error.message}`);
    }
  }
  async findAll(): Promise<InventoryEntity[]> {
    try {
      return await this.inventoryRepo.find({ relations: { product: true } });
    } catch (error) {
      throw new Error(`Error fetching inventory list: ${error.message}`);
    }
  }

  async findOneById(id: string): Promise<InventoryEntity> {
    try {
      const inventory = await this.inventoryRepo.findOneBy({ id: id });
      if (!inventory) {
        throw new NotFoundException(`Inventory with ID ${id} not found`);
      }
      return inventory;
    } catch (error) {
      throw new Error(`Error fetching inventory by ID: ${error.message}`);
    }
  }

  async updateInventory(id: string, dto: UpdateInventoryDto): Promise<object> {
    try {
      await this.findOneById(id); // Check if the inventory exists
      await this.inventoryRepo.update(id, dto);
      return this.findOneById(id);
    } catch (error) {
      throw new Error(`Error updating inventory: ${error.message}`);
    }
  }

  async productwithinventory() {}

  async deleteInventory(id: string): Promise<object> {
    try {
      const inventory = await this.findOneById(id);
      await this.inventoryRepo.remove(inventory);
      return { msg: 'Product Deleted Successfully!' };
    } catch (error) {
      throw new Error(`Error removing inventory: ${error.message}`);
    }
  }
}
