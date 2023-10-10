import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryDto } from './dto/find-all.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './model/category.model';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: 'Category create' })
  @ApiResponse({ status: 201, type: Category })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'find all Category' })
  @ApiResponse({ status: 201, type: [Category] })
  @Get()
  findAll(@Query() findCategoryDto: FindCategoryDto) {
    return this.categoryService.findAll(findCategoryDto);
  }

  @ApiOperation({summary: 'find One'})
  @ApiResponse({status: 201, type: Category})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
