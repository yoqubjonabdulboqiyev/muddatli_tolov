import { Module } from '@nestjs/common';
import { TermPaymentDurationService } from './term_payment_duration.service';
import { TermPaymentDurationController } from './term_payment_duration.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TermPaymentDuration } from './models/term_payment_duration.model';
import { Product } from 'src/product/models/product.model';
import { Order } from 'src/order/models/order.model';
import { JwtModules } from 'src/jwt/jwt.module';
import { Admin } from 'src/admin/models/admin.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([TermPaymentDuration, Product, Order, Admin]),
    AdminModule,
    JwtModules
  ],
  controllers: [TermPaymentDurationController],
  providers: [TermPaymentDurationService],
  exports: [TermPaymentDurationService]
})
export class TermPaymentDurationModule { }
