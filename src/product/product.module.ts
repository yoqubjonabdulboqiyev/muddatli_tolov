import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/category/model/category.model';
import { Product } from './models/product.model';
import { ProductPhotoModule } from 'src/product_photo/product_photo.module';
import { Order } from 'src/order/models/order.model';
import { User } from 'src/user/models/user.model';
import { UserModule } from 'src/user/user.module';
import { JwtModules } from 'src/jwt/jwt.module';
import { Admin } from 'src/admin/models/admin.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product, Admin]),
    ProductPhotoModule,
    AdminModule,
    JwtModules
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
