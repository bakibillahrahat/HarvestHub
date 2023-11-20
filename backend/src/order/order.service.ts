import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderDto, OrderItemDto } from './order.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    private productService: ProductService,
    private userService: UserService,
    @InjectRepository(OrderEntity) private OrderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepo: Repository<OrderItemEntity>,
  ) {}
  async createOrder(dto: OrderDto): Promise<OrderEntity> {
    try {
      const id = `order_${Math.floor(Math.random() * 2365)}`;
      const order = new OrderEntity();
      order.id = id;
      order.user = await this.userService.getUserByID(dto.userid);
      return this.OrderRepo.save(order);
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }
  async findAllOrder(): Promise<OrderEntity[]> {
    try {
      return await this.OrderRepo.find({
        relations: { user: true, orderItems: true },
      });
    } catch (error) {}
  }
  async findOneById(id: string): Promise<OrderEntity> {
    try {
      const order = await this.OrderRepo.findOneBy({ id: id });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new Error(`Error fetching order by ID: ${error.message}`);
    }
  }

  async checkoutProduct(orderItem: OrderItemDto): Promise<OrderItemEntity> {
    try {
      const id = `item_${Math.floor(Math.random() * 2365)}`;
      const checkout = new OrderItemEntity();
      checkout.id = id;
      checkout.product = await this.productService.findById(
        orderItem.productId,
      );
      checkout.order = await this.findOneById(orderItem.orderId);
      checkout.quantity = orderItem.quantity;
      return this.orderItemRepo.save(checkout);
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }
}
