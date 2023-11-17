import { OrderEntity } from 'src/order/order.entity';
import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('user')
// @Unique(['username', 'email', 'phone'])
@Index(['username', 'email', 'phone'], { unique: true })
export class UserEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: string;
  @Column({ name: 'name', type: 'character varying' })
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  avater: string;
  @Column()
  role: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
  @OneToMany(() => ProductEntity, (product) => product.seller)
  products: ProductEntity[];
}
