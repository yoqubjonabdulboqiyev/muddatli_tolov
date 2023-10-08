import { PartialType } from '@nestjs/mapped-types';
import { CreateTermPaymentDurationDto } from './create-term_payment_duration.dto';

export class UpdateTermPaymentDurationDto extends PartialType(CreateTermPaymentDurationDto) {}
