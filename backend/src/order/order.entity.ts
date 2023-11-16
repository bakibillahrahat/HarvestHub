import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  orderNumber: string;
  @Column()
  orderDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
