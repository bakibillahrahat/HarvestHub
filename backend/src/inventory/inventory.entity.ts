import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  stockLevel: number;
  @OneToOne(() => ProductEntity, (product) => product.inventory, {
    cascade: true,
  })
  @JoinColumn()
  product: ProductEntity;
}
