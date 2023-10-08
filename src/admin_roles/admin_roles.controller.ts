import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdminRolesService } from './admin_roles.service';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';

@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesService) { }

  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRoleDto) {    
    return this.adminRolesService.create(createAdminRoleDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRolesService.remove(+id);
  }
}
