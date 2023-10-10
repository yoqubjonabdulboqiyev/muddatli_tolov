import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepo: typeof Order,
    @InjectModel(Product) private readonly productRepo: typeof Product

  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const { product_id, count } = createOrderDto;
    const product = await this.productRepo.findOne({ where: { id: product_id } });
    await this.productRepo.update({ count: product.dataValues.count - count }, { where: { id: product.id } })
    const createOrder = await this.orderRepo.create(createOrderDto)
    return createOrder;
  }

  async findAll(user_id: number) {
    const orders = await this.orderRepo.findAll({ where: { user_id: user_id }, include: { all: true } })
    return orders;
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ where: { id: id } })
    if (!order) {
      throw new BadRequestException('Photo not found')
    }
    return order;
  }

  async remove(id: number) {
    await this.orderRepo.destroy({ where: { id: id } })
    return 'ok';
  }
}
