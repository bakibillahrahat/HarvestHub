import {
  Column,
  CreateDateColumn,
  Entity,
<<<<<<< HEAD
  PrimaryGeneratedColumn,
  Unique,
=======
  Index,
  PrimaryColumn,
>>>>>>> development
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
<<<<<<< HEAD
@Unique(['username', 'email', 'phone'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
=======
// @Unique(['username', 'email', 'phone'])
@Index(['username', 'email', 'phone'], { unique: true })
export class UserEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: string;
>>>>>>> development
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
}
