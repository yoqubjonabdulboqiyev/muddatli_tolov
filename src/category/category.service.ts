import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { Op } from 'sequelize';
import { FindCategoryDto } from './dto/find-all.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category

  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const category = await this.categoryRepo.findOne({ where: { name: name } })
    if (category) {
      throw new BadGatewayException("Category already exists")
    }
    const createCategory = await this.categoryRepo.create(createCategoryDto)

    return createCategory;
  }

  async findAll(findCategoryDto: FindCategoryDto) {
    const { name } = findCategoryDto;
    const where = {};
    if (name) where['name'] = { [Op.like]: `%${name}%` };
    const category = await this.categoryRepo.findAll({ where });
    return category;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id: id } })
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      throw new BadGatewayException('category not found')
    }
    const categoryName = await this.categoryRepo.findOne({ where: { name: name } });
    if (categoryName && (categoryName.dataValues.id !== category.dataValues.id)) {
      throw new BadGatewayException('category already exists')
    }
    await this.categoryRepo.update(updateCategoryDto, { where: { id: id } })

    return "ok";
  }

  async remove(id: number) {
    await this.categoryRepo.destroy({ where: { id: id } })
    return 'ok';
  }
}
