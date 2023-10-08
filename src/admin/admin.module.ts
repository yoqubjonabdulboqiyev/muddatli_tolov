import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/role/models/role.model';
import { Admin } from './models/admin.model';
import { Admin_roles } from 'src/admin_roles/models/admin_role.model';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, Admin, Admin_roles]),
    RoleModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}
