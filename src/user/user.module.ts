import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Order } from 'src/order/models/order.model';
import { Product } from 'src/product/models/product.model';
import { MailModule } from 'src/mail/mail.module';
import { JwtModules } from 'src/jwt/jwt.module';
import { Admin } from 'src/admin/models/admin.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Order, Product, Admin]),
    AdminModule,
    MailModule,
    JwtModules
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
