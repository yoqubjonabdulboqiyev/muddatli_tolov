import { Module } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryController } from './payment_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentHistory } from './models/payment_history.model';
import { Order } from 'src/order/models/order.model';
import { TermPaymentDuration } from 'src/term_payment_duration/models/term_payment_duration.model';
import { JwtModules } from 'src/jwt/jwt.module';
import { Admin } from 'src/admin/models/admin.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PaymentHistory, Order, TermPaymentDuration, Admin]),
    JwtModules,
    AdminModule
  ],
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService],
  exports: [PaymentHistoryService]
})
export class PaymentHistoryModule { }
