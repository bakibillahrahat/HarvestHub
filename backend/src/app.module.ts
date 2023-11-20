import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TransactionModule } from './transaction/transaction.module';
import { InventoryModule } from './inventory/inventory.module';
import { MailerModule } from '@nestjs-modules/mailer';
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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'harvesthub5@gmail.com',
          pass: 'ajgu ihix bhis cwer',
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    OrderModule,
    TransactionModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
