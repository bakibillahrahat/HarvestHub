import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { InventoryTsService } from './inventory.ts/inventory.ts.service';
import { InventoryTsController } from './inventory.ts/inventory.ts.controller';
import { InventoryTsModule } from './inventory.ts/inventory.ts.module';
import { TransactionsTsService } from './transactions.ts/transactions.ts.service';
import { TransactionTsController } from './transaction.ts/transaction.ts.controller';
import { TransactionTsModule } from './transaction.ts/transaction.ts.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5434,
      username: 'admin',
      password: 'postgres',
      database: 'scms',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    OrderModule,
    InventoryTsModule,
    TransactionTsModule,
  ],
  controllers: [AppController, OrderController, InventoryTsController, TransactionTsController],
  providers: [AppService, OrderService, InventoryTsService, TransactionsTsService],
})
export class AppModule {}
