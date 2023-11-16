import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order-item')
export class OrderItemEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  quantity: number;
  // Many order items can belong to one order
  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  product: ProductEntity;
}
