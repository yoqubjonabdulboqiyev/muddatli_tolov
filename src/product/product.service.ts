import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FindProductDto } from './dto/find-all.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepo: typeof Product

  ) { }
  async create(createProductDto: CreateProductDto) {
    const createProduct = await this.productRepo.create(createProductDto)
    return createProduct;
  }

  async findAll(findProductDto: FindProductDto) {
    const { name, description, category_id } = findProductDto;
    const where = {};
    if (name) where['name'] = { [Op.like]: `%${name}%` };
    if (description) where['description'] = { [Op.like]: `%${description}%` };
    if (category_id) where['category_id'] = +category_id;

    const product = await this.productRepo.findAll({ where });
    return product;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id: id } })
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new BadGatewayException('product not found')
    }
    await this.productRepo.update(updateProductDto, { where: { id: id } })
    return "ok";
  }

  async remove(id: number) {
    await this.productRepo.destroy({ where: { id: id } })
    return 'ok';
  }
}
