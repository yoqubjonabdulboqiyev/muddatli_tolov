import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { Op } from 'sequelize';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepo: typeof Role
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    const { name, description } = createRoleDto;
    const find_role = await this.roleRepo.findOne({ where: { name: name } });
    if (find_role) {
      throw new BadRequestException(`Role ${name} already exists`)
    }
    const role = await this.roleRepo.create(createRoleDto)

    return role;
  }

  async findAll(findAllDto: FindAllDto) {
    const { name, description } = findAllDto;
    const where = {};
    if (name) where['name'] = { [Op.like]: `%${name}%` };
    if (description) where['description'] = { [Op.like]: `%${description}%` };
    const role = await this.roleRepo.findAll({ where});
    if (!role) throw new BadRequestException('Role Not Found');
    return role;
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({ where: { id: id } });
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { name } = updateRoleDto;
    const find_role_id = await this.roleRepo.findOne({ where: { id: id } })
    if (!find_role_id) {
      throw new BadRequestException(`Role ${id} not found`);
    }
    const find_role = await this.roleRepo.findOne({ where: { name: name } });
    if (find_role && (find_role.id !== id)) {
      throw new BadRequestException(`Role ${name} already exists`);
    }
    const role = await this.roleRepo.update(updateRoleDto, { where: { id: id } })
    return "ok";
  }

  async remove(id: number) {
    await this.roleRepo.destroy({ where: { id: id } });
    return "ok";
  }
}
