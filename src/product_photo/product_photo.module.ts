import { Module } from '@nestjs/common';
import { ProductPhotoService } from './product_photo.service';
import { ProductPhotoController } from './product_photo.controller';

@Module({
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
})
export class ProductPhotoModule {}
