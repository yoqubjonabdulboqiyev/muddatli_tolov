import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { AdminRolesService } from './admin_roles.service';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';
import { SuperAdminGuard } from 'src/guards/super.admin.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin_roles } from './models/admin_role.model';

@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesService) { }

  @ApiOperation({summary: 'create admin roles'})
  @ApiResponse({status: 201, type: Admin_roles})
  @UseGuards(SuperAdminGuard)
  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    return this.adminRolesService.create(createAdminRoleDto);
  }

  @ApiOperation({summary: 'get admin role'})
  @ApiResponse({status: 201, type: [Admin_roles]})
  @UseGuards(AdminGuard)
  @Get('all/:admin_id')
  findAll(@Param('admin_id') admin_id: string) {
    return this.adminRolesService.findAll(+admin_id);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: Admin_roles})
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminRolesService.findOne(+id);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRolesService.remove(+id);
  }
}
