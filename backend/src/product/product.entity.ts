// product.entity.ts
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
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
  productimage: string;
  // @ManyToOne(() => UserEntity, (seller) => seller.products)
  // seller: UserEntity;
}
