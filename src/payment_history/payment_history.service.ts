import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreatePaymentHistoryDto } from './dto/create-payment_history.dto';
import { UpdatePaymentHistoryDto } from './dto/update-payment_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentHistory } from './models/payment_history.model';
import { Sequelize } from 'sequelize';
import { Order } from 'src/order/models/order.model';
import { TermPaymentDuration } from 'src/term_payment_duration/models/term_payment_duration.model';

@Injectable()
export class PaymentHistoryService {
  constructor(
    @InjectModel(PaymentHistory) private readonly paymentHistoryRepo: typeof PaymentHistory,
    @InjectModel(Order) private readonly orderRepo: typeof Order,
    @InjectModel(TermPaymentDuration) private readonly durationRepo: typeof TermPaymentDuration

  ) { }
  async create(createPaymentHistoryDto: CreatePaymentHistoryDto) {
    const { order_id } = createPaymentHistoryDto;
    console.log(createPaymentHistoryDto);
    
    const createPaymentHistory = await this.paymentHistoryRepo.create(createPaymentHistoryDto)
    const [result] = await this.paymentHistoryRepo.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount'],
      ],
      where: {
        order_id: order_id,
      },
    });
    const order = await this.orderRepo.findOne({ where: { id: order_id } });
    const duration = await this.durationRepo.findOne({ where: { id: order.dataValues.duration_id } });
    if (duration.dataValues.total_price <= Number(result.dataValues.amount)) {
      await this.orderRepo.update({ success: true }, { where: { id: order_id } })
    }
    return createPaymentHistory;
  }

  async findAll(order_id: number) {
    const paymentHistory = await this.paymentHistoryRepo.findAll({ where: { order_id: order_id } });
    return paymentHistory;
  }

  async findOne(id: number) {
    const paymentHistory = await this.paymentHistoryRepo.findOne({ where: { id: id } })
    return paymentHistory;
  }

  async update(id: number, updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    const { order_id } = updatePaymentHistoryDto;
    const paymentHistory = await this.paymentHistoryRepo.findOne({ where: { id: id } });
    if (!paymentHistory) {
      throw new BadGatewayException('paymentHistory not found')
    }
    await this.paymentHistoryRepo.update(updatePaymentHistoryDto, { where: { id: id } })
    const [result] = await this.paymentHistoryRepo.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount'],
      ],
      where: {
        order_id: order_id,
      },
    });
    const order = await this.orderRepo.findOne({ where: { id: order_id } });
    const duration = await this.durationRepo.findOne({ where: { id: order.dataValues.duration_id } });
    if (duration.dataValues.total_price <= Number(result.dataValues.amount)) {
      await this.orderRepo.update({ success: true }, { where: { id: order_id } })
    }
    return "ok";
  }

  async remove(id: number) {
    await this.paymentHistoryRepo.destroy({ where: { id: id } })
    return 'ok';
  }
}
