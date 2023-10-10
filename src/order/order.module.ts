import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { Order } from './models/order.model';
import { Product } from 'src/product/models/product.model';
import { TermPaymentDuration } from 'src/term_payment_duration/models/term_payment_duration.model';
import { ProductModule } from 'src/product/product.module';
import { PaymentHistory } from 'src/payment_history/models/payment_history.model';
import { PaymentHistoryModule } from 'src/payment_history/payment_history.module';
import { JwtModules } from 'src/jwt/jwt.module';
import { AdminModule } from 'src/admin/admin.module';
import { Admin } from 'src/admin/models/admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Order, Product, TermPaymentDuration, Admin, PaymentHistory]),
    ProductModule,
    PaymentHistoryModule,
    AdminModule,
    JwtModules
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule { }
