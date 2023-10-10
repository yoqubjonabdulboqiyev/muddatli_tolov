import { Module } from '@nestjs/common';
import { AdminRolesService } from './admin_roles.service';
import { AdminRolesController } from './admin_roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/role/models/role.model';
import { Admin } from 'src/admin/models/admin.model';
import { Admin_roles } from './models/admin_role.model';
import { RoleModule } from 'src/role/role.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModules } from 'src/jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, Admin, Admin_roles]),
    RoleModule,
    AdminModule,
    JwtModules
  ],
  controllers: [AdminRolesController],
  providers: [AdminRolesService],
  exports:[AdminRolesService]
})
export class AdminRolesModule {}
