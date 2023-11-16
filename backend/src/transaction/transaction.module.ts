import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactoinEntity } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactoinEntity])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
