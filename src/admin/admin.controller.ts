import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { FindAllDto } from './dto/findAll.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiResponse({ status: 201, type: Admin })
  @Post('sign_up')
  registration(
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return this.adminService.create(createAdminDto)
  }
  @Get('all')
  findAll(@Query() findAllDto: FindAllDto) {
    return this.adminService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
