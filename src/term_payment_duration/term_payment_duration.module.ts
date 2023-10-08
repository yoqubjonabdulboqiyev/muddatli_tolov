import { Module } from '@nestjs/common';
import { TermPaymentDurationService } from './term_payment_duration.service';
import { TermPaymentDurationController } from './term_payment_duration.controller';

@Module({
  controllers: [TermPaymentDurationController],
  providers: [TermPaymentDurationService],
})
export class TermPaymentDurationModule {}
