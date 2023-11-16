// src/transactions/transaction.entity.ts
import { OrderEntity } from 'src/order/order.entity';
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  // Many transactions can belong to one order
  @ManyToOne(() => OrderEntity, (order) => order.transactions)
  order: OrderEntity;
}
