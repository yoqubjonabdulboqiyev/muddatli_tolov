import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { AdminRolesModule } from './admin_roles/admin_roles.module';
import { ProductPhotoModule } from './product_photo/product_photo.module';
import { TermPaymentDurationModule } from './term_payment_duration/term_payment_duration.module';
import { OrderModule } from './order/order.module';
import { PaymentHistoryModule } from './payment_history/payment_history.module';
import { Admin } from './admin/models/admin.model';
import { UploadModule } from './upload/upload.module';
import { JwtModules } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { User } from './user/models/user.model';
import { Product } from './product/models/product.model';
import { Role } from './role/models/role.model';
import { Admin_roles } from './admin_roles/models/admin_role.model';
import { Photo } from './product_photo/models/product_photo.model';
import { TermPaymentDuration } from './term_payment_duration/models/term_payment_duration.model';
import { Order } from './order/models/order.model';
import { PaymentHistory } from './payment_history/models/payment_history.model';
import { Category } from './category/model/category.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      database: String(process.env.POSTGRES_DB),
      models: [Admin, User, Product, Role, Admin_roles, Photo, TermPaymentDuration, Order, PaymentHistory, Category],
      autoLoadModels: true,
      logging: true
    }),
    AdminModule, UserModule, CategoryModule, ProductModule, RoleModule, AdminRolesModule, ProductPhotoModule, TermPaymentDurationModule, OrderModule, PaymentHistoryModule, UploadModule, JwtModules, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



