import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TransactoinEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  amount: number;
}
