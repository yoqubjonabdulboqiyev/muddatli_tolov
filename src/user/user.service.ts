import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Op } from 'sequelize';
import { FindUserDto } from './dto/find-all.dto';
import { v4 as uuid } from "uuid"
import { Response } from 'express';
import * as bcrypt from 'bcrypt'
import { MailService } from 'src/mail/mail.service';
import { jwtService } from 'src/jwt/jwt.service';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    readonly mailService: MailService,
    readonly jwtService: jwtService,
  ) { }
  async create(createUserDto: CreateUserDto, res: Response) {
    const { phone_number, email } = createUserDto;
    const findUser = await this.userRepo.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { phone_number: phone_number }
        ]
      }
    })

    if (findUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userRepo.create(createUserDto);

    const uniqueKey = uuid();
    const { refresh_token } = await this.jwtService.generateToken({
      id: user.dataValues.id,
    });
    res.cookie('refresh_token', refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
    const userupdate = await this.userRepo.update({ hashed_refresh_token: hashed_refresh_token, activation_link: uniqueKey }, { where: { id: user.dataValues.id }, returning: true, }).then((updatedCustomer) => updatedCustomer[1][0]);
    try {
      await this.mailService.sendUserConfirmationMail(userupdate.dataValues);
    } catch (error) {
      console.log("error:", error);
    }
    return {
      message: 'User created successfully',
      data: userupdate,
    };
  }

  async logout(res: Response, refresh_token: string) {
    const user = await this.jwtService.verify(refresh_token);
    if (!user) {
      throw new ForbiddenException('user not found');
    }
    const findUser = await this.userRepo
      .update(
        {
          hashed_refresh_token: null,
        },
        {
          where: {
            id: user.id,
          }

        },
      )
    if (findUser) {
      res.clearCookie('refresh_token');
      return {
        message: 'User logged out successfully',
      };
    }
  }

  async Login(loginDto: LoginDto, res: Response) {
    const findUser = await this.userRepo.findOne({
      where: {
        phone_number: loginDto.phone_number,
      },
    });
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const isMatch = await bcrypt.compare(
      loginDto.password,
      findUser?.password
    );
    if (isMatch) {
      const { refresh_token } = await this.jwtService.generateToken({
        id: findUser?.id
      });
      res.cookie('refresh_token', refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
      const updatedUser = await this.userRepo
        .update(
          {
            hashed_refresh_token,
          },
          {
            where: {
              id: findUser.id,
            },
          },
        )
      if (updatedUser) {
        return {
          message: 'User logged in successfully',
          token: refresh_token,
        };
      }
    }
  }

  async findAll(findAllDto: FindUserDto) {
    const { first_name, last_name, phone_number, email } = findAllDto;
    const where = {};
    if (first_name) where['first_name'] = { [Op.like]: `%${first_name}%` };
    if (last_name) where['last_name'] = { [Op.like]: `%${last_name}%` };
    if (email) where['email'] = { [Op.like]: `%${email}% ` }
    if (phone_number) where['phone'] = { [Op.like]: `${phone_number}%` }

    const user = await this.userRepo.findAll({ where });
    if (!user) throw new BadRequestException('User Not Found');
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const { phone_number, email, photo } = updateUserDto;
    const { dataValues: findUser } = await this.userRepo.findOne({ where: { id: id } });
    if (!findUser) {
      throw new BadRequestException("User not found");
    };

    const findUserPhonenumber = await this.userRepo.findOne({
      where: { phone_number: phone_number }
    });
    const findUserEmail = await this.userRepo.findOne({
      where: { email: email }
    });
    if (findUserPhonenumber && (findUser.dataValues.id !== findUserPhonenumber.dataValues.id)) {
      throw new BadRequestException("User phonenumber already exists");
    }
    if (findUserEmail && (findUser.dataValues.id !== findUserEmail.dataValues.id)) {
      throw new BadRequestException("User email already exists");
    }
    updateUserDto.photo ? photo : findUser.photo;
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    const user = await this.userRepo.update(updateUserDto, { where: { id: id } })
    return "Ok";
  }

  async remove(id: number) {
    await this.userRepo.destroy({ where: { id: id } });
    return "ok";
  }
}
