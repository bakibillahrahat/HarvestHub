// // order.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   orderDate: Date;

//   @ManyToOne(() => User, (user) => user.orders)
//   user: User;

//   @ManyToOne(() => Product, (product) => product.orders)
//   product: Product;

//   @Column()
//   quantity: number;

//   @Column()
//   totalAmount: number;
// }
