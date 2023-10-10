import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { FindAllDto } from './dto/findAll.dto';
import { SuperAdminGuard } from 'src/guards/super.admin.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { LoginDto } from 'src/user/dto/login.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({summary: 'register Admin'})
  @ApiResponse({status: 201, type: Admin})
  @UseGuards(SuperAdminGuard)
  @Post('sign_up')
  registration(
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return this.adminService.create(createAdminDto)
  }

  @ApiOperation({summary: 'find all  Admin'})
  @ApiResponse({status: 201, type: [Admin]})
  @UseGuards(SuperAdminGuard)
  @Get('all')
  findAll(@Query() findAllDto: FindAllDto) {
    return this.adminService.findAll(findAllDto);
  }

  @ApiOperation({summary: 'find One'})
  @ApiResponse({status: 201, type: Admin})
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({summary: 'login Admin'})
  @ApiResponse({status: 201, type: Admin})
  @Post('/auth/signin')
  onLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.Login(loginDto, res);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
