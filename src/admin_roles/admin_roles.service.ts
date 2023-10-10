import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin_roles } from './models/admin_role.model';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';
import { Admin } from 'src/admin/models/admin.model';
import { Role } from 'src/role/models/role.model';

@Injectable()
export class AdminRolesService {
  constructor(
    @InjectModel(Admin_roles) private readonly adminRolesRepo: typeof Admin_roles,
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    @InjectModel(Role) private readonly roleRepo: typeof Role,

  ) { }
  async create(createAdminRoleDto: CreateAdminRoleDto) {
    const { admin_id, role_id } = createAdminRoleDto;
    const adminRole = await this.adminRolesRepo.findOne({ where: { admin_id: admin_id, role_id: role_id } })
    if (adminRole) {
      throw new BadRequestException('role already exists')
    }
    const role = await this.roleRepo.findOne({
      where: {
        id: role_id
      }
    });
    if (!role) {
      throw new BadRequestException('role not found');
    }
    const admin = await this.adminRepo.findOne({ where: { id: admin_id } })
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    const createRole = this.adminRolesRepo.create(createAdminRoleDto)
    return createRole;
  }


  async findAll(admin_id: number) {
    const admin = await this.adminRolesRepo.findAll({ where: { admin_id: admin_id }, include: { all: true } });
    if (!admin) throw new BadRequestException('User Not Found');
    return admin;
  }


  async findOne(id: number) {
    const admin = await this.adminRolesRepo.findOne({ where: { id: id }, include: { all: true } });
    if (!admin) throw new BadRequestException('User Not Found');
    return admin;
  }

  async remove(id: number) {
    await this.adminRolesRepo.destroy({ where: { id: id } })
    return 'ok';
  }
}
