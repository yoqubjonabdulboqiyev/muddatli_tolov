import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './models/role.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/admin/models/admin.model';
import { Admin_roles } from 'src/admin_roles/models/admin_role.model';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModules } from 'src/jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, Admin]),
    JwtModules
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule { }
