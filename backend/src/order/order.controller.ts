import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, OrderItemDto } from './order.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderservice: OrderService) {}
  @Get('vieworders')
  allOrders() {
    return this.orderservice.findAllOrder();
  }
  @Get('/:id')
  findOrdersByid(@Param('id') orderId: string) {
    return this.orderservice.findOneById(orderId);
  }
  @Post('createorder')
  createOrder(@Body() dto: OrderDto) {
    return this.orderservice.createOrder(dto);
  }
  @Post('checkout')
  checkout(@Body() dto: OrderItemDto) {
    return this.orderservice.checkoutProduct(dto);
  }
}
