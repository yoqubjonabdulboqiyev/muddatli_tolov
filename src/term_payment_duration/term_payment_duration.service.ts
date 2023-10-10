import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTermPaymentDurationDto } from './dto/create-term_payment_duration.dto';
import { UpdateTermPaymentDurationDto } from './dto/update-term_payment_duration.dto';
import { TermPaymentDuration } from './models/term_payment_duration.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindTermPaymentDurationDto } from './dto/find-all.dto';

@Injectable()
export class TermPaymentDurationService {
  constructor(
    @InjectModel(TermPaymentDuration) private readonly durationRepo: typeof TermPaymentDuration

  ) { }
  async create(createTermPaymentDurationDto: CreateTermPaymentDurationDto) {
    const { duration, product_id } = createTermPaymentDurationDto;
    const durationFind = await this.durationRepo.findOne({ where: { duration: duration, product_id: product_id } })
    if (durationFind) {
      throw new BadRequestException("duration already exists")
    }
    const createTermPaymentDuration = await this.durationRepo.create(createTermPaymentDurationDto)
    return createTermPaymentDuration;
  }
  async findOne(id: number) {
    const duration = await this.durationRepo.findOne({ where: { id: id } })
    if (!duration) {
      throw new BadRequestException('duration not found')
    }
    return duration;
  }

  async findAll(product_id: number) {
    const duration = await this.durationRepo.findAll({ where: { product_id: product_id } })
    return duration;
  }

  async update(id: number, updateTermPaymentDurationDto: UpdateTermPaymentDurationDto) {
    const duration = await this.durationRepo.findOne({ where: { id: id } });
    if (!duration) {
      throw new BadRequestException('duration not found')
    }
    const finndDuration = await this.durationRepo.findOne({ where: { duration: updateTermPaymentDurationDto.duration, product_id: updateTermPaymentDurationDto.product_id } });
    if (finndDuration && (finndDuration.dataValues.id !== id)) {
      throw new BadRequestException("Duration is already exists");
    }
    await this.durationRepo.update(updateTermPaymentDurationDto, { where: { id: id } })
    return "ok";
  }

  async remove(id: number) {
    await this.durationRepo.destroy({ where: { id: id } })
    return 'ok';
  }
}
