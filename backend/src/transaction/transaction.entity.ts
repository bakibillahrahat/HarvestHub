import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('transaction')
export class TransactoinEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  amount: number;
}
