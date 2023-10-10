import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductPhotoDto } from './dto/create-product_photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product_photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/product_photo.model';

@Injectable()
export class ProductPhotoService {
  constructor(
    @InjectModel(Photo) private readonly photoRepo: typeof Photo

  ) { }
  async create(createProductPhotoDto: CreateProductPhotoDto) {
    const photo = await this.photoRepo.create(createProductPhotoDto)
    return photo;
  }

  async findAll(product_id: number) {
    const photoes = await this.photoRepo.findAll({ where: { product_id: product_id } })
    return photoes;
  }

  async findOne(id: number) {
    const photo = await this.photoRepo.findOne({ where: { id: id } })
    if (!photo) {
      throw new BadRequestException('Photo not found')
    }
    return photo;
  }
  async remove(id: number) {
    await this.photoRepo.destroy({ where: { id: id } });
    return "ok";
  }
}
