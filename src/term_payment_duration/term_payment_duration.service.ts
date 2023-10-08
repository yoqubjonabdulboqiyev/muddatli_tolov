import { Injectable } from '@nestjs/common';
import { CreateTermPaymentDurationDto } from './dto/create-term_payment_duration.dto';
import { UpdateTermPaymentDurationDto } from './dto/update-term_payment_duration.dto';

@Injectable()
export class TermPaymentDurationService {
  create(createTermPaymentDurationDto: CreateTermPaymentDurationDto) {
    return 'This action adds a new termPaymentDuration';
  }

  findAll() {
    return `This action returns all termPaymentDuration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termPaymentDuration`;
  }

  update(id: number, updateTermPaymentDurationDto: UpdateTermPaymentDurationDto) {
    return `This action updates a #${id} termPaymentDuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} termPaymentDuration`;
  }
}
