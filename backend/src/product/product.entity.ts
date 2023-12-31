import { InventoryEntity } from 'src/inventory/inventory.entity';
import { OrderItemEntity } from 'src/order/order-item.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @Column()
  productImage: string;
  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: ProductEntity[];

  @OneToOne(() => InventoryEntity, (inventory) => inventory.product, {
    onDelete: 'CASCADE',
  })
  inventory: InventoryEntity;
  @ManyToOne(() => UserEntity, (seller) => seller.products, {
    onDelete: 'CASCADE',
  })
  seller: UserEntity;
}
