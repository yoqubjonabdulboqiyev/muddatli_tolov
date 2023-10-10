import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { Op } from 'sequelize';
import { FindAllDto } from './dto/findAll.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import * as bcrypt from "bcrypt"
import { jwtService } from 'src/jwt/jwt.service';
import { Response } from 'express';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    readonly jwtService: jwtService,

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
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 12);
    const admin = await this.adminRepo.create(createAdminDto)
    return admin;
  }

  async findAll(findAllDto: FindAllDto) {
    const { first_name, last_name, phone_number, email } = findAllDto;
    const where = {};
    if (first_name) where['first_name'] = { [Op.like]: `%${first_name}%` };
    if (last_name) where['last_name'] = { [Op.like]: `%${last_name}%` };
    if (email) where['email'] = { [Op.like]: `%${email}% ` }
    if (phone_number) where['phone'] = { [Op.like]: `${phone_number}%` }

    const admin = await this.adminRepo.findAll({ where });
    if (!admin) throw new BadRequestException('Admin Not Found');
    return admin;
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    return admin;
  }


  async Login(loginDto: LoginDto, res: Response) {
    let findAdmin = await this.adminRepo.findOne({
      where: {
        phone_number: loginDto.phone_number,
      },
    });
    if (!findAdmin) {
      throw new HttpException('Admin not found', HttpStatus.UNAUTHORIZED);
    }
    findAdmin = findAdmin.dataValues

    const isMatch = await bcrypt.compare(
      loginDto.password,
      findAdmin?.password
    );

    if (isMatch) {
      const { refresh_token } = await this.jwtService.generateToken({
        id: findAdmin?.id
      });
      res.cookie('refresh_token', refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
      const updatedAdmin = await this.adminRepo
        .update(
          {
            hashed_refresh_token,
          },
          {
            where: {
              id: findAdmin.id,
            },
          },
        )

      if (updatedAdmin) {
        return {
          message: 'Admin logged in successfully',
          token: refresh_token,
        };
      }
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {

    const { phone_number, email, photo } = updateAdminDto;
    const { dataValues: findAdmin } = await this.adminRepo.findOne({ where: { id: id } });
    if (!findAdmin) {
      throw new BadRequestException("Admin not found");
    };

    const findAdminPhonenumber = await this.adminRepo.findOne({
      where: { phone_number: phone_number }
    });
    const findAdminEmail = await this.adminRepo.findOne({
      where: { email: email }
    });
    if (findAdminPhonenumber && (findAdmin.dataValues.id !== findAdminPhonenumber.dataValues.id)) {
      throw new BadRequestException("Admin phonenumber already exists");
    }
    if (findAdminEmail && (findAdmin.dataValues.id !== findAdminEmail.dataValues.id)) {
      throw new BadRequestException("Admin email already exists");
    }
    updateAdminDto.photo ? photo : findAdmin.photo;
    updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 12);
    const admin = await this.adminRepo.update(updateAdminDto, { where: { id: id } })
    return "Ok";
  }

  async remove(id: number) {
    await this.adminRepo.destroy({ where: { id: id } });
    return "ok";
  }
}
