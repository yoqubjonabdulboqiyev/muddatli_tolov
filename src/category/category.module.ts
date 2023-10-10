import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { Product } from 'src/product/models/product.model';
import { ProductModule } from 'src/product/product.module';
import { JwtModules } from 'src/jwt/jwt.module';
import { Admin } from 'src/admin/models/admin.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product, Admin]),
    ProductModule,
    AdminModule,
    JwtModules
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule { }
