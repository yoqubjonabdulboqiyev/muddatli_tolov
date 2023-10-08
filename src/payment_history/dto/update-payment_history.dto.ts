import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentHistoryDto } from './create-payment_history.dto';

export class UpdatePaymentHistoryDto extends PartialType(CreatePaymentHistoryDto) {}
