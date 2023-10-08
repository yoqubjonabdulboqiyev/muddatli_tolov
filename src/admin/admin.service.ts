import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { Op } from 'sequelize';
import { log } from 'console';
import { FindAllDto } from './dto/findAll.dto';
import { Role } from 'src/role/models/role.model';
import { Admin_roles } from 'src/admin_roles/models/admin_role.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin
  ) { }
  async create(createAdminDto: CreateAdminDto) {
    const { phone_number, email } = createAdminDto;
    const findAdmin = await this.adminRepo.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { phone_number: phone_number }
        ]
      }
    })

    if (findAdmin) {
      throw new BadRequestException("Admin already exists")
    }

    const admin = await this.adminRepo.create(createAdminDto)
    return admin;
  }

  async findAll(findAllDto: FindAllDto) {
    const { first_name, last_name, phone_number, email } = findAllDto;
    console.log("salom");

    const where = {};
    if (first_name) where['first_name'] = { [Op.like]: `%${first_name}%` };
    if (last_name) where['last_name'] = { [Op.like]: `%${last_name}%` };
    if (email) where['email'] = { [Op.like]: `%${email}% ` }
    if (phone_number) where['phone'] = { [Op.like]: `${phone_number}%` }

    const admin = await this.adminRepo.findAll({ where, include: { all: true } });
    if (!admin) throw new BadRequestException('User Not Found');
    return admin;
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id }, include: { all: true } });
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    console.log(updateAdminDto);

    const { phone_number, email, photo } = updateAdminDto;
    const { dataValues: findAdmin } = await this.adminRepo.findOne({ where: { id: id } });
    if (!findAdmin) {
      throw new BadRequestException("Admin not found");
    };

    const { dataValues: findAdminPhonenumber } = await this.adminRepo.findOne({
      where: { phone_number: phone_number }
    });
    const { dataValues: findAdminEmail } = await this.adminRepo.findOne({
      where: { email: email }
    });
    if (findAdminPhonenumber && (findAdmin.id !== findAdminPhonenumber.id)) {
      throw new BadRequestException("Admin phonenumber already exists");
    }
    if (findAdminEmail && (findAdmin.id !== findAdminEmail.id)) {
      throw new BadRequestException("Admin email already exists");
    }
    updateAdminDto.photo ? photo : findAdmin.photo;
    const admin = await this.adminRepo.update(updateAdminDto, { where: { id: id } })
    return "Ok";
  }

  async remove(id: number) {
    await this.adminRepo.destroy({ where: { id: id } });
    return "ok";
  }
}
