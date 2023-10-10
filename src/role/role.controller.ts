import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindAllDto } from './dto/find-all.dto';
import { SuperAdminGuard } from 'src/guards/super.admin.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './models/role.model';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({summary: 'create Role'})
  @ApiResponse({status: 201, type: Role})
  @UseGuards(SuperAdminGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({summary: 'Find all Role'})
  @ApiResponse({status: 201, type: [Role]})
  @UseGuards(SuperAdminGuard)
  @Get()
  findAll(@Query() findAllDto: FindAllDto) {
    return this.roleService.findAll(findAllDto);
  }

  @ApiOperation({summary: 'find One Role'})
  @ApiResponse({status: 201, type: Role})
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(SuperAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
