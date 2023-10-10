import { Module } from '@nestjs/common';
import { ProductPhotoService } from './product_photo.service';
import { ProductPhotoController } from './product_photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/product_photo.model';
import { Product } from 'src/product/models/product.model';
import { TermPaymentDuration } from 'src/term_payment_duration/models/term_payment_duration.model';
import { JwtModules } from 'src/jwt/jwt.module';
import { Admin } from 'src/admin/models/admin.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Photo, Product, TermPaymentDuration, Admin]),
    JwtModules,
    AdminModule
  ],
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
  exports: [ProductPhotoService]
})
export class ProductPhotoModule {}
