import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { TransactionEntity } from 'src/transaction/transaction.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryColumn()
  id: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
  @OneToMany(() => TransactionEntity, (transaction) => transaction.order)
  transactions: TransactionEntity[];
}
